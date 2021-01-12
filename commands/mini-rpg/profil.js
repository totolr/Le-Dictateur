const { MessageEmbed } = require("discord.js");
const { capitalize } = require("../../functions/string");
const { calculateUserAttributs } = require("../../functions/rpg");
const classes = require("../../assets/rpg/classes.json");

module.exports.run = async (client, message, args, data, userInfo, userRpg) => {
  if (userRpg.class == "") return message.reply("Tu dois d'abord utiliser la commande \`setup\` pour créer ton personnage!");

  const position = classes.map(e => e.name.toLowerCase()).indexOf(userRpg.class.toLowerCase());
  const userAttributs = await calculateUserAttributs(client, message);
  const classe = classes[position];

  const embed = new MessageEmbed()
    .setAuthor(`${message.author.username} | ${userRpg.class} de niveau ${userRpg.level}`, message.author.displayAvatarURL())
    .setThumbnail(classe.icon)
    .setDescription(`${userRpg.description !== "" ? userRpg.description : classe.description}`)
    .addField("Stats",
      `PV: ${userRpg.hp}
      Expérience en RPG: ${client.getExperienceRpg(userRpg.level, userRpg.experience)}
      ${Object.entries(userAttributs).map(([key, value]) => `${capitalize(key)}: ${value}`).join(' | ')}`
    )
    .addField("Inventaire",
      `${userRpg.coins} 💰
      ${userRpg.inventory.length != 0 ? userRpg.inventory.join(", ") : "L'inventaire est vide"}`
    )
    .addField("Equipement", `${Object.entries(userRpg.equipments).map(([key, value]) => `${capitalize(key)}: ${value}`).join(' | ')}`);

  message.channel.send(embed);
};

module.exports.help = {
  name: "profil",
  aliases: ['profil', 'p'],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Renvoie le profil de votre personnage",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: true
};