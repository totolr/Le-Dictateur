const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let member = client.getMember(message, args[0]);

  if (!member || message.author.id === member.id) {
    member = message.guild.members.cache
      .filter(m => m.id !== message.author.id)
      .random();
  }

  const love = Math.random() * 100;
  const loveIndex = Math.floor(love / 10);
  const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

  const embed = new MessageEmbed()
    .setColor("#ffb6c1")
    .addField(`☁ **${member.displayName}** aime **${message.member.displayName}** à:`,
    `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
    .setFooter(`${client.user.username} - Love`);

  message.channel.send(embed);
  message.delete({ timeout: 5000 }).catch(console.error);
}

module.exports.help = {
  name: "love",
  aliases: ['love', 'amour'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Calcule l'affinité amoureuse que vous avez pour une autre personne.",
  cooldown: 1,
  usage: '<@user | id | username>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};