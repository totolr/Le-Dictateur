const { canModifyQueue } = require("../../util/music");

module.exports.run = (client, message, args) => {
  const queue = client.queue.get(message.guild.id);
  if (!queue) return message.channel.send(":x: Il n'y a pas de file d'attente.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (isNaN(args[0])) return message.reply(`Veuillez utiliser un nombre pour cette commande.`);

  const song = queue.songs.splice(args[0] - 1, 1);
  queue.textChannel.send(`${message.author} ❌ enleve **${song[0].title}** de la file d'attente.`);
  message.delete();
};

module.exports.help = {
  name: "remove",
  aliases: ['remove', 'retirer'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Permet de retirer une musique de la file d'attente",
  cooldown: 3,
  usage: '<nombre_queue>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};