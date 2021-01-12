const { MessageEmbed } = require("discord.js");  

module.exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle(`Suggestion de **${message.author.tag}**`)
    .setColor("#ffef00")
    .addFields({ name: "Suggestion :", value: args.join(" ")})
    .setTimestamp()
    .setFooter(`${client.user.username} - Suggestion`)

  message.delete();

  const poll = await message.channel.send(embed);
  await poll.react('🟩');
  await poll.react('🟦');
  await poll.react('🟥');
};

module.exports.help = {
  name: "suggest",
  aliases: ['suggest', 'suggestion', 'idee'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Proposez une idée pour le serveur ! (merci  <@296352239491088384>)",
  cooldown: 1,
  usage: "<suggestion>",
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};