const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild) => {
  console.log(`nouvelle guild: ${guild.name}(${guild.id})/${guild.memberCount}/${guild.owner.user.tag}(${guild.ownerID})`);
  await client.createGuild({guildID: guild.id,}); 

  const embedlog = new MessageEmbed()
    .setTitle("Serveur rejoint !")
    .setDescription(`**Info serveur**\nNom: **${guild.name}** (\`${guild.id}\`)\nMembres: ${guild.memberCount}\nOwner: **${guild.owner.user.tag}** (\`${guild.ownerID}\`)`)
    .setColor("#00ff00")
    .setFooter(`${client.guilds.cache.size.toString()} serveurs`)
    .setTimestamp();
  
  client.channels.cache.get('776577092501897226').send(embedlog);
};
