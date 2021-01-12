const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {  
  if (member.guild.id === '727614066247598145') {
    const embed = new MessageEmbed()
      .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
      .setColor("#dc143c")
      .setFooter("Un utilisateur à quitté")
      .setTimestamp();
  
    client.channels.cache.get('776577092501897226').send(embed);
  }
}