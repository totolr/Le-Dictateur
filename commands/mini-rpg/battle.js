const { calculateUserAttributs, battle } = require("../../functions/rpg");
const { capitalize } = require("../../functions/string");
const hostile = require("../../assets/npc/hostile.json");
const ennemi = require("../../assets/npc/hostile.json");

module.exports.run = async (client, message, args, data) => {
  const player = await client.getRpg(message.member);
  const playerStats = await calculateUserAttributs(client, message);
  const q = args.join(" ")
  const position = hostile.map(e => e.name.toLowerCase()).indexOf(q.toLowerCase());
  const monster = hostile[position];

  if (!args[0]) {
    return message.reply(`Voici comment utiliser la commande \`${data.prefix}battle <nom_ennemi>\`\nEt voici les ennemies disponibles:\n${ennemi.map((e) => `${e.name} avec ${e.attributs.hp}pv / ${e.coins}💰, ${e.experience}exp`).join("\n")}`)
  }

  if (monster == undefined) return message.reply("ce monstre n'existe pas!");

  battle(client, message, playerStats, player, monster);
};

module.exports.help = {
  name: "battle",
  aliases: ['battle'],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Bataille avec un ennemi",
  cooldown: 10,
  usage: '<nom_ennemi>',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: true
};