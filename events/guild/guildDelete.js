const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild) => {
  client.deleteGuild(guild);
  
  const embedlog = new MessageEmbed()
    .setTitle("Serveur quitté...")
    .setDescription(`**Info serveur**\nNom: **${guild.name}** (\`${guild.id}\`)\nMembres: ${guild.memberCount}\nOwner: **${guild.owner.user.tag}** (\`${guild.ownerID}\`)`)
    .setColor("#ff0000")
    .setFooter(`${client.guilds.cache.size.toString()} serveurs`)
    .setTimestamp();
  
  client.channels.cache.get('776577092501897226').send(embedlog);
};