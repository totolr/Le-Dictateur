const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("`Génération de la gifle...`");
  const memberAuthor = message.member;
  let memberOther = undefined;
  if (message.mentions.users.first()) memberOther = message.guild.member(message.mentions.users.first());

  const slap = await fetch("https://nekos.life/api/v2/img/slap")
    .then(res => res.json())
    .then(json => json.url);

    if (memberAuthor === memberOther) {
      const embed = new MessageEmbed()
      .setTitle(`${memberAuthor.user.username} _se gifle, masochiste ?_ 🤔`)
      .setImage(slap)
      .setFooter("Powered by nekos.life");
    

      message.channel.send(embed);
    } else if(memberOther !== undefined) {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _gifle ${memberOther.user.username}_`)
    .setImage(slap)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else if (args[0]){
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _gifle ${args.join(" ")}_`)
    .setImage(slap)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  } else {
    const embed = new MessageEmbed()
    .setTitle(`${memberAuthor.user.username} _gifle rien..._`)
    .setImage(slap)
    .setFooter("Powered by nekos.life");

    message.channel.send(embed);
  }
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "slap",
  aliases: ['slap', 'gifle'],
  category: 'social',
  displayName: '🎭 Social',
  description: "Gifle quelqu'un",
  cooldown: 3,
  usage: '<@user>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};