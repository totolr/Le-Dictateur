const { play } = require("../../functions/play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default;
const https = require("https");
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, DEFAULT_VOLUME } = require("../../util/music");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports.run = async (client, message, args, data) => {
  const { channel } = message.member.voice;

  const serverQueue = client.queue.get(message.guild.id);
  if (!channel) return message.reply("Vous devez d'abord rejoindre un canal vocal!").catch(console.error);
  if (serverQueue && channel !== message.guild.me.voice.channel)
    return message.reply(`Vous devez être dans le même canal que ${client.user}`).catch(console.error);

  const permissions = channel.permissionsFor(client.user);
  if (!permissions.has("CONNECT"))
    return message.reply(":x: Impossible de se connecter au canal vocal, autorisations manquantes");
  if (!permissions.has("SPEAK"))
    return message.reply(":x: Je ne peux pas parler dans ce canal vocal, assurez-vous que j'ai les autorisations appropriées!");

  const search = args.join(" ");
  const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
  const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
  const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
  const url = args[0];
  const urlValid = videoPattern.test(args[0]);

  if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
    return client.commands.get("playlist").run(client, message, args, data);
  } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
    return client.commands.get("playlist").run(client, message, args, data);
  }

  if (mobileScRegex.test(url)) {
    try {
      https.get(url, function (res) {
        if (res.statusCode == "302") {
          return client.commands.get("play").run(client, message, [res.headers.location]);
        } else {
          return message.reply("Aucun contenu n'a pu être trouvé à cette URL.").catch(console.error);
        }
      });
    } catch (error) {
      console.error(error);
      return message.reply(error.message).catch(console.error);
    }
    return message.reply("Suite à la redirection d'URL...").catch(console.error);
  }

  const queueConstruct = {
    textChannel: message.channel,
    channel,
    connection: null,
    songs: [],
    loop: false,
    volume: data.volumeMusique || DEFAULT_VOLUME,
    playing: true
  };

  let songInfo = null;
  let song = null;

  if (urlValid) {
    try {
      songInfo = await ytdl.getInfo(url);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        duration: songInfo.videoDetails.lengthSeconds
      };
    } catch (error) {
      console.error(error);
      return message.reply(error.message).catch(console.error);
    }
  } else if (scRegex.test(url)) {
    try {
      const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
      song = {
        title: trackInfo.title,
        url: trackInfo.permalink_url,
        duration: Math.ceil(trackInfo.duration / 1000)
      };
    } catch (error) {
      console.error(error);
      return message.reply(error.message).catch(console.error);
    }
  } else {
    try {
      const results = await youtube.searchVideos(search, 1);
      songInfo = await ytdl.getInfo(results[0].url);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        duration: songInfo.videoDetails.lengthSeconds
      };
    } catch (error) {
      console.error(error);
      return message.reply(error.message).catch(console.error);
    }
  }

  if (serverQueue) {
    serverQueue.songs.push(song);
    return serverQueue.textChannel
      .send(`✅ **${song.title}** a été ajouté à la file d'attente par ${message.author}`)
      .catch(console.error);
  }

  queueConstruct.songs.push(song);
  client.queue.set(message.guild.id, queueConstruct);

  try {
    queueConstruct.connection = await channel.join();
    await queueConstruct.connection.voice.setSelfDeaf(true);
    play(queueConstruct.songs[0], message);
  } catch (error) {
    console.error(error);
    client.queue.delete(message.guild.id);
    await channel.leave();
    return message.channel.send(`:x: Impossible de rejoindre le channel: ${error}`).catch(console.error);
  }
  message.delete({ timeout: 5000 }).catch(console.error);
};


module.exports.help = {
  name: "play",
  aliases: ['play'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Joue de la musique",
  cooldown: 3,
  usage: '<youtube_url | nom_vidéo | soundcloud_url>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};