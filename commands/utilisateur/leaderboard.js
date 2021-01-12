const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
  const embed = new MessageEmbed()
    .setTitle("Top 10 des utlisateurs sur le serveur")
    .setColor("#a41f14")
    .setDescription("lE LeAdErBoArD EsT VrAiMeNt TrÈs ImPoRtAnT PoUr uN SeRvEuR!")
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setFooter(`${client.user.username} - Leaderboard`)

  let i = 0;

  await client.getUsers(message.member).then(p => {
    p.sort((a, b) => (client.getExperience(a.level, a.experience) < client.getExperience(b.level, b.experience))? 1 : -1).splice(0, 10).forEach(async (e) => {
      const userTag = await client.users.fetch(e.id);
      i = i + 1;
      embed.addField(`${i.toString()} - ${userTag.tag}`, `Niveau ${e.level} (${e.experience}/${Math.pow(e.level, 2) * 10})`);
    });
  });

  message.channel.send(embed);
  message.delete();
};

module.exports.help = {
  name: "leaderboard",
  aliases: ['leaderboard', 'classement', 'leadexp'],
  category: 'utilisateur',
  displayName: '👥 Utilisateur',
  description: "Classement d'expérience (top 10) des utlisateurs sur le serveur",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: true,
  rpg: false
};