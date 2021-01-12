const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {   
  if (member.guild.id === '727614066247598145') {
    const embedlog = new MessageEmbed()
      .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
      .setColor("#35f092")
      .setFooter("Un utilisateur à rejoint")
      .setTimestamp();

    const embedDM = new MessageEmbed()
      .setTitle(`Bienvenue sur **${member.guild.name}** 👋`)
      .setDescription(`Nous espérons que ce serveur communautaire vous plaira et n'oubliez pas d'accepter le règlement dans le salon <#744941637846695956> pour avoir un accès complet, et vous pouvez choisir des rôles dans <#789629239267819591> !`)
      .setColor("#ffef00")
      .setFooter(`Vous êtes le ${member.guild.memberCount}ème membres à nous rejoindre`);
  
    client.channels.cache.get('742848435207536681').send(`Hey ${member}, bienvenue sur **${member.guild.name}**!👋`);
    client.channels.cache.get('776577092501897226').send(embedlog);
    member.createDM().then(channel => {
      channel.send(embedDM);
    }).catch(console.error);
  }

}