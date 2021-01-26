const { canModifyQueue } = require("../../util/music");

module.exports.run = (client, message, args)  => {
  const queue = client.queue.get(message.guild.id);

  if (!queue) return message.reply(":x: Il n'y a rien à jouer.").catch(console.error);
  if (!canModifyQueue(message.member))
    return message.reply("Vous devez d'abord rejoindre un canal vocal!").catch(console.error);

  if (!args[0]) return message.reply(`🔊 Le volume actuel est: **${queue.volume}%**`).catch(console.error);
  if (isNaN(args[0])) return message.reply("Veuillez utiliser un nombre pour régler le volume.").catch(console.error);
  if (Number(args[0]) > 100 || Number(args[0]) < 0)
    return message.reply("Veuillez utiliser un nombre compris entre 0 et 100.").catch(console.error);

  queue.volume = args[0];
  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

  queue.textChannel.send(`Volume réglé sur: **${args[0]}%**`).catch(console.error);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "volume",
  aliases: ['volume'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Changer le volume de la musique en cours de lecture",
  cooldown: 3,
  usage: '[<volume>]',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};