const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("`Fabrication de la colle...`");
  const memberAuthor = message.member;
  let memberOther = undefined;
  if (message.mentions.users.first()) memberOther = message.guild.member(message.mentions.users.first());

  const cuddle = await fetch("https://nekos.life/api/v2/img/cuddle")
    .then(res => res.json())
    .then(json => json.url);

  if (memberAuthor === memberOther) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _se colle à lui même, bizarre_ 🤔`)
    .setImage(cuddle)
    .setFooter("Powered by nekos.life");
  
    message.channel.send(embed);
  } else if (memberOther !== undefined) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _se colle à ${memberOther.user.username}_`)
    .setImage(cuddle)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else if (args[0]){
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _se colle à ${args.join(" ")}_`)
    .setImage(cuddle)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _se colle à rien..._`)
    .setImage(cuddle)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  }
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "cuddle",
  aliases: ['cuddle'],
  category: 'social',
  displayName: '🎭 Social',
  description: "Colle toi à quelqu'un",
  cooldown: 3,
  usage: '<@user>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};