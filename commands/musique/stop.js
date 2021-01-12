const { canModifyQueue } = require("../../util/music");


module.exports.run = (client, message) => {
  const queue = client.queue.get(message.guild.id);
    
  if (!queue) return message.reply(":x: Il n'y a rien à jouer.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  queue.songs = [];
  queue.connection.dispatcher.end();
  queue.textChannel.send(`${message.author} ⏹ a arrêté la musique!`).catch(console.error);
  message.delete();
};

module.exports.help = {
  name: "stop",
  aliases: ['stop'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Stop la musique",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};