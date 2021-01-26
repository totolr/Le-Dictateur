const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
  const embed = new MessageEmbed()
    .setTitle("La dictature")
    .setColor("#0087bd")
    .setDescription(`nom féminin\n(latin dictatura)`)
    .addField("Défintions:", "Régime politique dans lequel le pouvoir est détenu par une personne ou par un groupe de personnes (junte) qui l'exercent sans contrôle, de façon autoritaire ; durée pendant laquelle s'exerce le pouvoir d'un dictateur.\n\nPouvoir absolu exercé par une personne ou un groupe dans un domaine particulier ; tyrannie.\n\nInfluence extrême de quelque chose : La dictature de la mode.\n\nSous la République romaine, magistrature extraordinaire exercée par le dictateur.", false)
    .addField("Synonymes:", "absolutisme - autocratie - fascisme - nazisme - totalitarisme - despotisme - tyrannie", true)
    .addField("Contraire:", "démocratie", true)
    .setFooter(`${client.user.username} - Definition`);

  message.channel.send(embed);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "definition",
  aliases: ['definition', 'def'],
  category: 'la dictature',
  displayName: '🤬 La Dictature',
  description: "Renvoie la définition de dictature.",
  cooldown: 1,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};