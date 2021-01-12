const { canModifyQueue } = require("../../util/music");

module.exports.run = (client, message) => {
  const queue = client.queue.get(message.guild.id);
  if (!queue) return message.reply(":x: Il n'y a rien à jouer.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause(true);
    return queue.textChannel.send(`${message.author} ⏸ a mis la musique en pause.`).catch(console.error);
  }
  message.delete();
};

module.exports.help = {
  name: "pause",
  aliases: ['pause'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Met en pause",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};