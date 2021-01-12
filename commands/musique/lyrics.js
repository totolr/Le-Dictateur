const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports.run = async (client, message) => {
  const queue = client.queue.get(message.guild.id);
  if (!queue) return message.channel.send(":x: Il n'y a rien à jouer.").catch(console.error);

  let lyrics = null;

  try {
    lyrics = await lyricsFinder(queue.songs[0].title, "");
    if (!lyrics) lyrics = `Aucune parole trouvée pour ${queue.songs[0].title}.`;
  } catch (error) {
    lyrics = `Aucune parole trouvée pour ${queue.songs[0].title}.`;
  }

  let lyricsEmbed = new MessageEmbed()
    .setTitle("Paroles")
    .setDescription(lyrics)
    .setColor("#800080")
    .setTimestamp();

  if (lyricsEmbed.description.length >= 2048) {
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return message.channel.send(lyricsEmbed).catch(console.error);
  }

  message.delete();
};

module.exports.help = {
  name: "lyrics",
  aliases: ['lyrics', 'ly', 'paroles'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Affiche les paroles de la chanson en cours",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};