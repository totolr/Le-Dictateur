  
const { canModifyQueue } = require("../../util/music");

module.exports.run = (client, message) => {
  const queue = client.queue.get(message.guild.id);
  if (!queue) return message.channel.send(":x: Il n'y a pas de file d'attente.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  let songs = queue.songs;
  for (let i = songs.length - 1; i > 1; i--) {
    let j = 1 + Math.floor(Math.random() * i);
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.songs = songs;
  client.queue.set(message.guild.id, queue);
  queue.textChannel.send(`${message.author} 🔀 a mélangé la file d'attente`).catch(console.error);
  message.delete();
};

module.exports.help = {
  name: "shuffle",
  aliases: ['shuffle', 'melanger'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Mélanger la queue",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};