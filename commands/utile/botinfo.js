const { MessageEmbed, version } = require("discord.js");
let os = require('os')
let cpuStat = require("cpu-stat")

module.exports.run = async (client, message) => {
  cpuStat.usagePercent(function(err, percent, seconds) {
  if (err) {
  return console.log(err);
  }

  let secondsUptime = Math.floor(client.uptime / 1000);
  let minutesUptime = Math.floor(secondsUptime / 60);
  let hoursUptime = Math.floor(minutesUptime / 60);
  let daysUptime = Math.floor(hoursUptime / 24);

  secondsUptime %= 60;
  minutesUptime %= 60;
  hoursUptime %= 24;

 
  const embed = new MessageEmbed()
    .setColor("#B4E0E0")
    .setAuthor(`${client.user.username} Info`, client.user.avatarURL())
    .addField("⏳ Ram utilisé", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, true)
    .addField("📁 Serveurs", `\`${client.guilds.cache.size}\``, true)
    .addField("📁 Utilisateurs", `\`${client.users.cache.size}\``, true)
    .addField("👾 Discord.js", `\`v${version}\``, true)
    .addField("🤖 Node", `\`${process.version}\``, true)
    .addField(`⏱️ Uptime:`, `\`${daysUptime}j, ${hoursUptime}h, ${minutesUptime}min, ${secondsUptime}sec\``, true)
    .addField("🤖 CPU utilisé", `\`${percent.toFixed(2)}%\``, true)
    .addField("🤖 Architecture", `\`${os.arch()}\``, true)
    .addField("💻 Plateforme", `\`\`${os.platform()}\`\``, true)
    .addField("Latence API", `\`${(client.ws.ping)}ms\``, true)
    .addField('Source', `[GitHub](https://github.com/totolerigolo324/Le-Dictateur)`, true)  
    .addField('Support', `[Invitation Serveur](https://discord.gg/q7uhPKb)`, true)    
    .setFooter(`${client.user.username} - Botinfo`)

  message.channel.send(embed);
});
message.delete();
};
module.exports.help = {
  name: "botinfo",
  aliases: ['botinfo'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Renvoie des informations concernant le bot!",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};