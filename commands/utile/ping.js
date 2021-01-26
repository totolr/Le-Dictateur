const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
  const msg = await message.channel.send("Ping!");

  const embed = new MessageEmbed()
    .addField('Pong!', `Latence du bot: ${msg.createdTimestamp - message.createdTimestamp}ms\nLatence de l'API: ${Math.round(client.ws.ping)}ms`)
    .setColor("#ffef00")
    .setFooter(`${client.user.username} - Ping`);
  
  message.channel.send(embed);
  msg.delete();
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "ping",
  aliases: ['ping'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Renvoie pong!",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};