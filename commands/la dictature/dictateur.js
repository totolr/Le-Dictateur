const { MessageEmbed } = require("discord.js");
const dictateur = require("../../assets/dictature/dictateur.json")

module.exports.run = async (client, message) => {
  let msg = await message.channel.send("`Recherche d'un dictateur...`");

  const infoDictateur = dictateur[Math.floor(Math.random() * dictateur.length)];
  
  const embed = new MessageEmbed()
    .setTitle(infoDictateur.nom)
    .setColor("#0087bd")
    .setThumbnail(infoDictateur.image)
    .setDescription(infoDictateur.description)
    .setFooter('Powered by https://fr.wikipedia.org/');
  
  message.channel.send(embed);
  msg.delete();
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "dictateur",
  aliases: ['dictateur'],
  category: 'la dictature',
  displayName: '🤬 La Dictature',
  description: "Renvoie le profil d'un dictateur",
  cooldown: 1,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};