const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("`Génération du calin...`");
  const memberAuthor = message.member;
  let memberOther = undefined;
  if (message.mentions.users.first()) memberOther = message.guild.member(message.mentions.users.first());

  const hug = await fetch("https://nekos.life/api/v2/img/hug")
    .then(res => res.json())
    .then(json => json.url);

    if (memberAuthor === memberOther) {
      const embed = new MessageEmbed()
      .setTitle(`${memberAuthor.user.username} _s'auto-caline, tu te sens seul ?_`)
      .setImage(hug)
      .setFooter("Powered by nekos.life");
    

      message.channel.send(embed);
    } else if(memberOther !== undefined) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _fait un câlin à ${memberOther.user.username}_`)
    .setImage(hug)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else if (args[0]){
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _fait un câlin à ${args.join(" ")}_`)
    .setImage(hug)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _fait un câlin à rien..._`)
    .setImage(hug)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  }
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "hug",
  aliases: ['hug'],
  category: 'social',
  displayName: '🎭 Social',
  description: "Fait un calin à quelqu'un",
  cooldown: 3,
  usage: '<@user>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};