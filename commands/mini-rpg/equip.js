const { capitalize } = require("../../functions/string");
const getItemInfo = require("../../assets/shop/shop.json")

module.exports.run = (client, message, args, data, userInfo, userRpg) => {
  const q = args.join(" ");
  const userEquipment = userRpg.equipments;
  const userInventory = userRpg.inventory;
  const userInventoryItemPosition = userInventory.indexOf(capitalize(q));

  if (userInventoryItemPosition == -1) return message.reply(":x: vous ne possédez pas cet objet dans votre inventaire (ou alors, vous l'avez mal orthographié)");

  const itemInfoPosition = getItemInfo.map(e => e.name).indexOf(capitalize(q));

  userEquipment[getItemInfo[itemInfoPosition].type] = userInventory[userInventoryItemPosition];
  userInventory.splice(userInventoryItemPosition, 1);

  client.updateRpg(message.member, {
    equipments: userEquipment,
    inventory: userInventory
  });

  message.channel.send(`${q} a bien été équipé!`);
};

module.exports.help = {
  name: "equip",
  aliases: ['equip'],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Equiper un objet sur votre personnage",
  cooldown: 3,
  usage: '<objet_à_equiper>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: true
};