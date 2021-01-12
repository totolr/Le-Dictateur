const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message) => {
  const queue = client.queue.get(message.guild.id);
  if (!queue) return message.reply("There is nothing playing.").catch(console.error);

  const song = queue.songs[0];
  const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
  const left = song.duration - seek;

  let nowPlaying = new MessageEmbed()
    .setTitle("Now playing")
    .setDescription(`${song.title}\n${song.url}`)
    .setColor("#800080")
    .setAuthor(`${client.user.username} - Nowplaying`);

  if (song.duration > 0) {
    nowPlaying.addField(
      "\u200b",
      new Date(seek * 1000).toISOString().substr(11, 8) +
        "[" +
        createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
        "]" +
        (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
      false
    );
    nowPlaying.setFooter("Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8));
  }

  message.channel.send(nowPlaying);
  message.delete();
};

module.exports.help = {
  name: "nowplaying",
  aliases: ['nowplaying', 'live'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Afficher la chanson en cours de lecture",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};
