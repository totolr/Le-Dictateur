const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, data) => {
  if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.reply('il faut spécifier un ***nombre*** entre 1 et 100!');

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  message.delete();
  await message.channel.bulkDelete(messages);

  message.channel.send(`🗑️ J'ai bien supprimé ${args[0]} message(s).`).then(msg => msg.delete({ timeout: 5000 }));

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#287db5")
    .setTimestamp()
    .setDescription(`**Action**: purge\n**Nbr de messages**: ${args[0]}\n**Salon**: ${message.channel}`);

  client.channels.cache.get(data.logchannel).send(embed);
  message.delete();
};

module.exports.help = {
  name: "purge",
  aliases: ['purge'],
  category: 'moderation',
  displayName: '🛠️ Moderation',
  description: "Purge un nombre de message spécifié",
  cooldown: 3,
  usage: '<nbr_messages>',
  isUserAdmin: false,
  permissions: true,
  args: true,
  logchannel: true,
  exp: false,
  rpg: false
};