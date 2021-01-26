const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let msg = await message.channel.send("\`Génération de l'avatar...\`");

  let member = client.getMember(message, args.join(" ")) || message.member;

  if (!member)
    return message.reply("l'utilisateur n'existe pas.");
  
  let mentionedUser = member.user;

  let embed = new MessageEmbed()
    .setImage(mentionedUser.displayAvatarURL())
    .setColor("#ffef00")
    .setTitle("Avatar")
    .setFooter("Searched by " + message.author.tag)
    .setDescription("[Avatar URL]("+mentionedUser.displayAvatarURL()+")");

    message.channel.send(embed);

  msg.delete();
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "avatar",
  aliases: ['avatar', 'pp'],
  category: 'utilisateur',
  displayName: '👥 Utilisateur',
  description: "Renvoie l'avatar d'un utilisateur",
  cooldown: 1,
  usage: '[<@user | id | username>]',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};