const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("`Génération de la tête...`");
  const memberAuthor = message.member;
  let memberOther = undefined;
  if (message.mentions.users.first()) memberOther = message.guild.member(message.mentions.users.first());

  const pat = await fetch("https://nekos.life/api/v2/img/pat")
    .then(res => res.json())
    .then(json => json.url);

    if (memberAuthor === memberOther) {
      const embed = new MessageEmbed()
      .setTitle(`${memberAuthor.user.username} _se tapote la tête_ 🤔`)
      .setImage(pat)
      .setFooter("Powered by nekos.life");
    

      message.channel.send(embed);
    } else if(memberOther !== undefined) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _tapote la tête de ${memberOther.user.username}_`)
    .setImage(pat)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else if (args[0]){
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _tapote la tête de ${args.join(" ")}_`)
    .setImage(pat)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _tapote la tête de rien..._`)
    .setImage(pat)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  }
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "pat",
  aliases: ['pat', 'tapote'],
  category: 'social',
  displayName: '🎭 Social',
  description: "Tapoter la tête de quelqu'un",
  cooldown: 3,
  usage: '<@user>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};