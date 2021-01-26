const { canModifyQueue } = require("../../util/music");

module.exports.run = (client, message, args) => {
  if (isNaN(args[0]))
    return message
      .reply(`Veuillez utiliser un nombre pour cette commande.`)
      .catch(console.error);

  const queue = client.queue.get(message.guild.id);
  if (!queue) return message.channel.send(":x: Il n'y a pas de file d'attente.").catch(console.error);
  if (!canModifyQueue(message.member)) return;
  if (args[0] > queue.songs.length)
    return message.reply(`La file d'attente contient seulement ${queue.songs.length} chansons!`).catch(console.error);

  queue.playing = true;
  
  if (queue.loop) {
    for (let i = 0; i < args[0] - 2; i++) {
      queue.songs.push(queue.songs.shift());
    }
  } else {
    queue.songs = queue.songs.slice(args[0] - 2);
  }
  queue.connection.dispatcher.end();
  queue.textChannel.send(`${message.author} ⏭ a skip ${args[0] - 1} chansons`).catch(console.error);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "skipto",
  aliases: ['skipto', 'passera'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Skip au numéro de file d'attente sélectionné",
  cooldown: 3,
  usage: '<nombre_queue>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};