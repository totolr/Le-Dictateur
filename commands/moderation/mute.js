const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, data) => {
  let user = client.getMember(message, args[0]);

  if (!user)
    return message.reply("l'utilisateur n'existe pas.");
  
  let muteRole = message.guild.roles.cache.find(r => r.name === 'muted'); 
  let muteTime = (args[1] || '60s');
  let reason = (args.splice(2).join(' ') || 'aucune raison spécifiée');

  if (message.guild.member(user.user).hasPermission('BAN_MEMBERS')) return message.reply(`tu ne peux pas utiliser la commande \`${data.prefix}mute\` sur cet utilisateur!`);

  if (isNaN(ms(muteTime)) || ms(muteTime) <= 0) {
    return message.reply("veuillez rentrer un temps valide");
  }


  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      data: {
        name: 'muted',
        color: '#000',
        permissions: []
      }
    });
  };

  message.guild.channels.cache.forEach(async (channel, id) => {
    await channel.updateOverwrite(muteRole, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      CONNECT: false
    });
  });

  await user.roles.add(muteRole.id);
  await user.voice.kick();
  message.channel.send(`<@${user.id}> est muté pour ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.displayAvatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: mute\n**Temps**: ${ms(ms(muteTime))}\n**Raison**: ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get(data.logchannel).send(embed);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "mute",
  aliases: ['mute'],
  category: 'moderation',
  displayName: '🛠️ Moderation',
  description: "Mute un utilisateur",
  cooldown: 3,
  usage: '<@user | id | username> <temps> <raison>',
  isUserAdmin: false,
  permissions: true,
  args: true,
  logchannel: true,
  exp: false,
  rpg: false
};