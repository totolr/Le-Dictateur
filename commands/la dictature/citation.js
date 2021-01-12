const { MessageEmbed } = require("discord.js");
const citation = require("../../assets/dictature/citation.json")

module.exports.run = async (client, message) => {
  let msg = await message.channel.send("`Génération de la citation...`");

  const infoCitation = citation[Math.floor(Math.random() * citation.length)];
  
  const embed = new MessageEmbed()
    .setColor("#0087bd")
    .setDescription(`**${infoCitation.citation}**`)
    .setFooter(infoCitation.auteur);

  message.channel.send(embed);
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "citation",
  aliases: ['citation'],
  category: 'la dictature',
  displayName: '🤬 La Dictature',
  description: "Renvoie une citation sur la dictature",
  cooldown: 1,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};