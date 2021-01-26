const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, data) => {
  let memberRole = client.getMember(message, args[0]);

  if (!memberRole)
    return message.reply("l'utilisateur n'existe pas.");

  let argsRole = args.splice(1).join(' ');

  let role = message.guild.roles.cache.get(argsRole);

  if (role == undefined && message.guild.roles.cache.find(role => role.name === argsRole.toString()) != undefined) {
    role = message.guild.roles.cache.find(role => role.name === argsRole);
  }

  if (role) {
    if (memberRole.roles.cache.has(role.id)) return message.channel.send(`${memberRole} a déjà ce rôle! Essayez à nouveau!`);

    memberRole.roles.add(role)
      .then(m => message.channel.send(`${m} possède maintenant le rôle ${role}`))
      .catch(e => console.log(e));

    const embed = new MessageEmbed()
      .setAuthor(`${memberRole.user.username} (${memberRole.id})`, memberRole.user.displayAvatarURL())
      .setColor("#126180")
      .setDescription(`**Action**: giverole\n**Role**: ${role}`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
  
    client.channels.cache.get(data.logchannel).send(embed);
  } else {
    message.reply("Le rôle n'existe pas!");
  }
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "giverole",
  aliases: ['giverole', 'grole', 'giver'],
  category: 'moderation',
  displayName: '🛠️ Moderation',
  description: "Donne un rôle à un utilisateur",
  cooldown: 3,
  usage: '<@user | id | username> <nom rôle | role ID>',
  isUserAdmin: false,
  permissions: true,
  args: true,
  logchannel: true,
  exp: false,
  rpg: false
};