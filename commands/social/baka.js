const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("`Naissance en cours...`");
  const memberAuthor = message.member;
  let memberOther = undefined;
  if (message.mentions.users.first()) memberOther = message.guild.member(message.mentions.users.first());

  const baka = await fetch("https://nekos.life/api/v2/img/baka")
    .then(res => res.json())
    .then(json => json.url);

  if (memberAuthor === memberOther) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _est un imbécile_ 😭`)
    .setImage(baka)
    .setFooter("Powered by nekos.life");
  
    message.channel.send(embed);
  } else if (memberOther !== undefined) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _trouve que ${memberOther.user.username} est un imbécile_ 😈`)
    .setImage(baka)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else if (args[0]){
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _trouve que ${args.join(" ")} est un imbécile_ 😈`)
    .setImage(baka)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _n'a pas compris le but de cette commande_ 😅`)
    .setImage(baka)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  }
  msg.delete();
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "cuddle",
  aliases: ['cuddle'],
  category: 'social',
  displayName: '🎭 Social',
  description: "Dit un quelqu'un qu'il est baka (dans la bonne humeur)",
  cooldown: 3,
  usage: '<@user>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};