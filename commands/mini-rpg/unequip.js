const { capitalize } = require("../../functions/string");
const getItemInfo = require("../../assets/shop/shop.json")

module.exports.run = (client, message, args, data, userInfo, userRpg) => {
  const q = args.join(" ");
  const userEquipment = userRpg.equipments;
  const userInventory = userRpg.inventory;
  const itemInfoPosition = getItemInfo.map(e => e.name).indexOf(capitalize(q));

  if (userEquipment[getItemInfo[itemInfoPosition].type] !== capitalize(q)) return message.reply("cet objet n'est pas équipé");

  userEquipment[getItemInfo[itemInfoPosition].type] = 'None';
  userInventory.push(q);

  client.updateRpg(message.member, {
    equipments: userEquipment,
    inventory: userInventory
  });

  message.channel.send(`${q} a bien été deséquipé!`);
};

module.exports.help = {
  name: "unequip",
  aliases: ['unequip', 'enlever'],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Enlever un objet sur votre personnage",
  cooldown: 3,
  usage: '<objet_à_enlever>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: true
};