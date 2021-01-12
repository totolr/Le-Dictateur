const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("\`Génération de l'avatar...\`");

  let mentionedUser = message.mentions.users.first() || message.author;

    let embed = new MessageEmbed()

    .setImage(mentionedUser.displayAvatarURL())
    .setColor("#ffef00")
    .setTitle("Avatar")
    .setFooter("Searched by " + message.author.tag)
    .setDescription("[Avatar URL]("+mentionedUser.displayAvatarURL()+")");

    message.channel.send(embed);

  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "avatar",
  aliases: ['avatar', 'pp'],
  category: 'utilisateur',
  displayName: '👥 Utilisateur',
  description: "Renvoie l'avatar d'un utilisateur",
  cooldown: 1,
  usage: '[<@user>]',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};