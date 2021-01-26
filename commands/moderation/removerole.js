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
    if (!memberRole.roles.cache.has(role.id)) return message.channel.send(`${memberRole} ne possède pas ce rôle!`);

    memberRole.roles.remove(role)
      .then(m => message.channel.send(`${m} ne possède plus le rôle ${role}`))
      .catch(e => console.log(e));

    const embed = new MessageEmbed()
      .setAuthor(`${memberRole.user.username} (${memberRole.id})`, memberRole.user.displayAvatarURL())
      .setColor("#126180")
      .setDescription(`**Action**: removerole\n**Role**: ${role}`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
  
    client.channels.cache.get(data.logchannel).send(embed);
  } else {
    message.reply("Vous ne pouvez pas enlever un rôle qui n'existe pas");
  }
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "removerole",
  aliases: ['removerole', 'rrole', 'remover'],
  category: 'moderation',
  displayName: '🛠️ Moderation',
  description: "Enleve un rôle à un utilisateur",
  cooldown: 3,
  usage: '<@user | id | username> <nom rôle | role ID>',
  isUserAdmin: false,
  permissions: true,
  args: true,
  logchannel: true,
  exp: false,
  rpg: false
};