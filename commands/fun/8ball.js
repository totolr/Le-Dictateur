const { MessageEmbed, MessageAttachment } = require("discord.js");
const eightballImg = new MessageAttachment('./assets/img/8ball.png');

module.exports.run = (client, message, args) => {
  const replies = ["Oui", "Non", "Peut-être", "Tu es chaud(e)", "Compte là-dessus", "Fonce", "C'est OK", "Pas maintenant", "Absolument", "Très probable", "Attends ça", "Demande encore", "Ça va passer", "Ne peut pas dire maintenant", "Sans aucun doute"];
  const question = args.join(" ");
  const response = Math.floor(Math.random() * replies.length);

  const embed = new MessageEmbed()
    .setTitle(message.author.tag)
    .setColor("#cb4e41")
    .attachFiles(eightballImg)
    .setThumbnail('attachment://8ball.png')
    .addField("❔ Question:", question)
    .addField("❗ Réponse à la question:", replies[response])
    .setFooter(`${client.user.username} - 8ball`)

  message.channel.send(embed);
  message.delete();
};

module.exports.help = {
  name: "8ball",
  aliases: ['8ball', 'question'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Renvoie une réponse à une question!",
  cooldown: 1,
  usage: '<question>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};