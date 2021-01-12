const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args) => {
  let member = message.member;
  if (args[0]) member = message.guild.member(message.mentions.users.first());
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
  message.delete();
};

module.exports.help = {
  name: "userinfo",
  aliases: ['userinfo'],
  category: 'utilisateur',
  displayName: '👥 Utilisateur',
  description: "Renvoie des informations concernant un utilisateur (ou vous-même)!",
  cooldown: 3,
  usage: '[<@user>]',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};