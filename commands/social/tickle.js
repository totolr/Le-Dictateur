const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("`Génération de la chatouille...`");
  const memberAuthor = message.member;
  let memberOther = undefined;
  if (message.mentions.users.first()) memberOther = message.guild.member(message.mentions.users.first());

  const tickle = await fetch("https://nekos.life/api/v2/img/tickle")
    .then(res => res.json())
    .then(json => json.url);

    if (memberAuthor === memberOther) {
      const embed = new MessageEmbed()
      .setTitle(`${memberAuthor.user.username} _se chatouille_`)
      .setImage(tickle)
      .setFooter("Powered by nekos.life");
    

      message.channel.send(embed);
    } else if(memberOther !== undefined) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _chatouille ${memberOther.user.username}_`)
    .setImage(tickle)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else if (args[0]){
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _chatouille ${args.join(" ")}_`)
    .setImage(tickle)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _chatouille rien..._`)
    .setImage(tickle)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  }
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "tickle",
  aliases: ['tickle', 'chatouille'],
  category: 'social',
  displayName: '🎭 Social',
  description: "Chatouiller quelqu'un",
  cooldown: 3,
  usage: '<@user>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};