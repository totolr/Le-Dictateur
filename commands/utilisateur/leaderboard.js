const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
  const embed = new MessageEmbed()
    .setTitle("Top 10 des utlisateurs sur le serveur")
    .setColor("#a41f14")
    .setDescription("lE LeAdErBoArD EsT VrAiMeNt TrÈs ImPoRtAnT PoUr uN SeRvEuR!")
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setFooter(`${client.user.username} - Leaderboard`)

  let i = 0, username, medal;

  await client.getUsers(message.member).then(p => {
    p.sort((a, b) => (client.getExperience(a.level, a.experience) < client.getExperience(b.level, b.experience))? 1 : -1).splice(0, 10).forEach(async (e) => {
      await client.users.fetch(e.id).then(user => {
        i = i + 1;
        medal = i;
        if (medal === 1) {
          medal = "🥇";
        } else if (medal === 2) {
          medal = "🥈";
        } else if (medal === 3) { 
          medal = "🥉";
        };
        username = user.tag;
        embed.addField(`${medal.toString()} - ${username}`, `Niveau ${e.level} (${e.experience}/${Math.pow(e.level, 2) * 10})`);
      }).catch(console.error);
    });
  }).catch(console.error);

  message.channel.send(embed);
  message.delete({ timeout: 5000 }).catch(console.error);
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