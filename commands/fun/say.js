module.exports.run = (client, message, args) => {
  message.channel.send(`${args.join(" ")} de la part de ${message.member.user}`);
  message.delete();
}

module.exports.help = {
  name: "say",
  aliases: ['say', 'rep'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Répète le message d'un utilisateur",
  cooldown: 1,
  usage: '<votre_message>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};