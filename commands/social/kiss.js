const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("`Génération du bisou...`");
  const memberAuthor = message.member;
  let memberOther = undefined;
  if (message.mentions.users.first()) memberOther = message.guild.member(message.mentions.users.first());

  const kiss = await fetch("https://nekos.life/api/v2/img/kiss")
    .then(res => res.json())
    .then(json => json.url);

    if (memberAuthor === memberOther) {
      const embed = new MessageEmbed()
      .setTitle(`${memberAuthor.user.username} _s'embrasse, bizarre_ 🤔`)
      .setImage(kiss)
      .setFooter("Powered by nekos.life");
    

      message.channel.send(embed);
    } else if(memberOther !== undefined) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _embrasse ${memberOther.user.username}_`)
    .setImage(kiss)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else if (args[0]){
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _embrasse ${args.join(" ")}_`)
    .setImage(kiss)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _embrasse rien..._`)
    .setImage(kiss)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  }
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "kiss",
  aliases: ['kiss', 'embrasse'],
  category: 'social',
  displayName: '🎭 Social',
  description: "Embrasse quelqu'un",
  cooldown: 3,
  usage: '<@user>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};