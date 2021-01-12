const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports.run = async (client, message, args) => {
  let language = args[0];
  let text = args.slice(1).join(" ");

  if (!language)
    return message.reply("Dans quelle langue suis-je censé traduire?");
  if (language.length !== 2)
    return message.reply("La langue doit être un alias de 2 lettres. Par exemple `English -> en`");
  if (!text) return message.reply("Que suis-je censé traduire?");

  const result = await translate(text, { to: language });

  const embed = new MessageEmbed()
    .setDescription(result.text)
    .setTitle("Google Translate")
    .setTimestamp()
    .setFooter(`${client.user.username} - Traduction`)
    .setColor("RED");

  message.channel.send(embed);
};

module.exports.help = {
  name: "traduction",
  aliases: ['traduction', 'translate'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Traduire une phrase",
  cooldown: 3,
  usage: '<langue> <texte_à_traduire>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};