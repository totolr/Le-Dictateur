const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, data) => {
  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'aucune raison spécifiée');

  if (!message.mentions.users.first() && client.users.cache.get(args[0]) != undefined) {
    user = client.users.cache.get(args[0]);
  } else if (!message.mentions.users.first() && client.users.cache.get(args[0]) == undefined) {
    return message.reply("l'utilisateur n'existe pas.")
  }

  if (message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply(`tu ne peux pas utiliser la commande \`${data.prefix}ban\` sur cet utilisateur!`);

  message.guild.member(user).ban({ reason: reason });

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#dc143c")
    .setDescription(`**Action**: ban\n**Raison**: ${reason}`)
    .setThumbnail(user.displayAvatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get(data.logchannel).send(embed);
  message.delete();
};

module.exports.help = {
  name: "ban",
  aliases: ['ban'],
  category: 'moderation',
  displayName: '🛠️ Moderation',
  description: "Ban un utilisateur",
  cooldown: 3,
  usage: '<@user | user ID> <raison>',
  isUserAdmin: false,
  permissions: true,
  args: true,
  logchannel: true,
  exp: false,
  rpg: false
};