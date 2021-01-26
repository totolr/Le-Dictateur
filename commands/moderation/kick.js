const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, data) => {
  let member = client.getMember(message, args[0]);

  if (!member)
    return message.reply("l'utilisateur n'existe pas.");
  
  let user = member.user;
  
  let reason = (args.splice(1).join(' ') || 'aucune raison spécifiée');
  
  if (message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply(`tu ne peux pas utiliser la commande \`${data.prefix}kick\` sur cet utilisateur!`)

  message.guild.member(user).kick(reason);

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#ffa500")
    .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
    .setThumbnail(user.displayAvatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get(data.logchannel).send(embed);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "kick",
  aliases: ['kick'],
  category: 'moderation',
  displayName: '🛠️ Moderation',
  description: "Kick un utilisateur",
  cooldown: 3,
  usage: '<@user | id | username> <raison>',
  isUserAdmin: false,
  permissions: true,
  args: true,
  logchannel: true,
  exp: false,
  rpg: false
};