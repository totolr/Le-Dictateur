const { MessageEmbed } = require("discord.js");
const { play } = require("../../functions/play");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default;
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, MAX_PLAYLIST_SIZE, DEFAULT_VOLUME } = require("../../util/music");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const db = require("quick.db");

module.exports.run = async (client, message) => {
  if (!db.get(`musiques_${message.member.user.id}`)) db.set(`musiques_${message.member.user.id}`, []);
  const dbUser = db.get(`musiques_${message.member.user.id}`);
  if (dbUser.length === 0) return message.reply(`Vous n'avez pas de musiques en favoris!`).catch(console.error);

  const { channel } = message.member.voice;
  const serverQueue = message.client.queue.get(message.guild.id);

  if (!channel) return message.reply("Vous devez d'abord rejoindre un canal vocal!").catch(console.error);

  const permissions = channel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT"))
    return message.reply(":x: Impossible de se connecter au canal vocal, autorisations manquantes");
  if (!permissions.has("SPEAK"))
    return message.reply(":x: Je ne peux pas parler dans ce canal vocal, assurez-vous que j'ai les autorisations appropriées!");

  if (serverQueue && channel !== message.guild.me.voice.channel)
    return message.reply(`Vous devez être dans le même canal que ${message.client.user}`).catch(console.error);

  const queueConstruct = {
    textChannel: message.channel,
    channel,
    connection: null,
    songs: [],
    loop: false,
    volume: DEFAULT_VOLUME || 100,
    playing: true
  };

  const videos = dbUser;

  const newSongs = videos.map((video) => {
    return (song = {
      title: video.title,
      url: video.url,
      duration: video.durationSeconds
    });
  });

  serverQueue ? serverQueue.songs.push(...newSongs) : queueConstruct.songs.push(...newSongs);

  let favorisEmbed = new MessageEmbed()
    .setTitle(`Les favoris de ${message.member.user.tag}`)
    .setDescription(newSongs.map((song, index) => `${index + 1}. ${song.title}`))
    .setColor("#800080")
    .setTimestamp();

  if (favorisEmbed.description.length >= 2048)
    favorisEmbed.description =
      favorisEmbed.description.substr(0, 2007) + "\nPlaylist larger than character limit...";

  message.channel.send(`${message.author} joue ses musiques favorites`, favorisEmbed);

  if (!serverQueue) {
    client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(`Impossible de rejoindre le channel: ${error.message}`).catch(console.error);
    }
  }
  message.delete();
};

module.exports.help = {
  name: "playfavoris",
  aliases: ['playfavoris', 'playfav'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Joue vos musiques favorites",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};