const { MessageEmbed } = require("discord.js");
const YouTubeAPI = require("simple-youtube-api");
const { YOUTUBE_API_KEY } = require("../../util/music");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports.run = async (client, message, args) => {
  if (message.channel.activeCollector)
    return message.reply("Un collecteur de messages est déjà actif dans ce channel.");
  if (!message.member.voice.channel)
    return message.reply("Vous devez d'abord rejoindre un canal vocal!").catch(console.error);

  const search = args.join(" ");

  let resultsEmbed = new MessageEmbed()
    .setTitle(`**Répondez avec le numéro de la chanson que vous souhaitez écouter**`)
    .setDescription(`Résultats pour: ${search}`)
    .setColor("#800080");

  try {
    const results = await youtube.searchVideos(search, 10);
    results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));

    let resultsMessage = await message.channel.send(resultsEmbed);

    function filter(msg) {
      const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/g;
      return pattern.test(msg.content);
    }

    message.channel.activeCollector = true;
    const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
    const reply = response.first().content;

    if (reply.includes(",")) {
      let songs = reply.split(",").map((str) => str.trim());

      for (let song of songs) {
        await client.commands
          .get("play")
          .run(client, message, [resultsEmbed.fields[parseInt(song) - 1].name]);
      }
    } else {
      const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
      client.commands.get("play").run(client, message, [choice]);
    }

    message.channel.activeCollector = false;
    resultsMessage.delete().catch(console.error);
    response.first().delete().catch(console.error);
  } catch (error) {
    console.error(error);
    message.channel.activeCollector = false;
    message.reply(error.message).catch(console.error);
  }
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "search",
  aliases: ['search', 'chercher'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Cherche et sélectionne une vidéo à écouter!",
  cooldown: 3,
  usage: '<nom_vidéo>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};