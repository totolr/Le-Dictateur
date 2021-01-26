const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args) => {
  let member = client.getMember(message, args.join(" ")) || message.member;

  if (!member)
    return message.reply("l'utilisateur n'existe pas.");
  
  let user = member.user;

  const embed = new MessageEmbed()
    .setColor("#CCE0B4")
    .setThumbnail(user.displayAvatarURL())
    .setDescription(`L'utilisateur **${user.username}** ${member.nickname === undefined ? '' : `aka **${member.nickname}**`} a rejoint le ${moment(member.joineAt).format('DD/MM/YYYY | hh:mm')} et possède les rôles suivants: ${member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')}.`)
    .addField(`Plus d'informations à propos de **${user.username}**`,
      `• Nom: ${user.tag}
      • Bot: ${user.bot ? 'true' : 'false'}
      • Créé le: ${moment(user.createdAt).format('DD/MM/YYYY | hh:mm')}
      • Statut: ${user.presence.status.toUpperCase()}`
    )
    .setFooter(`${client.user.username} - Userinfo`);

  message.channel.send(embed);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "userinfo",
  aliases: ['userinfo'],
  category: 'utilisateur',
  displayName: '👥 Utilisateur',
  description: "Renvoie des informations concernant un utilisateur (ou vous-même)!",
  cooldown: 3,
  usage: '[<@user | id | username>]',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};