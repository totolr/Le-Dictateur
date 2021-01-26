const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, data) => {
  let user = client.getMember(message, args[0]);

  if (!user)
    return message.reply("l'utilisateur n'existe pas.");

  let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

  if (!message.mentions.users.first() && message.guild.members.cache.get(args[0]) != undefined) {
    user = message.guild.members.cache.get(args[0]);
  } else if (!message.mentions.users.first() && message.guild.members.cache.get(args[0]) == undefined) {
    return message.reply("l'utilisateur n'existe pas.")
  }

  if (message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply(`tu ne peux pas utiliser la commande \`${data.prefix}unmute\` sur cet utilisateur!`)

  if (!user.roles.cache.has(muteRole.id)) return message.reply("l'utilisateur mentionné n'est pas muté!");
  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> n'est plus muté`);

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.displayAvatarURL())
    .setColor("#35f092")
    .setDescription(`**Action**: unmute`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get(data.logchannel).send(embed);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "unmute",
  aliases: ['unmute'],
  category: 'moderation',
  displayName: '🛠️ Moderation',
  description: "Unmute un utilisateur",
  cooldown: 3,
  usage: '<@user | id | username>',
  isUserAdmin: false,
  permissions: true,
  args: true,
  logchannel: true,
  exp: false,
  rpg: false
};