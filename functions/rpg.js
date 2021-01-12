const getItemInfo = require("../assets/shop/shop.json");
const classes = require("../assets/rpg/classes.json");

const calculateUserAttributs = async (client, message) => {
  const userInfo = await client.getRpg(message.member);

  const userAttributs = userInfo.attributs;
  const userEquipment = userInfo.equipments;

  for (const property in userEquipment) {
    if (userEquipment[property] == "None") continue;

    const itemInfoPosition = getItemInfo
      .map((e) => e.name)
      .indexOf(userEquipment[property]);
    const itemAttributs = getItemInfo[itemInfoPosition].attributs;

    for (attribut in itemAttributs) {
      switch (attribut) {
        case "strength":
          userAttributs.strength += itemAttributs[attribut];
          break;
        case "agility":
          userAttributs.agility += itemAttributs[attribut];
          break;
        case "intelligence":
          userAttributs.intelligence += itemAttributs[attribut];
          break;
        case "spirit":
          userAttributs.spirit += itemAttributs[attribut];
          break;
      }
    }
  }
  return userAttributs;
};

const battle = (client, message, playerStats, player, hostile) => {
  if (player.hp == 0) return message.reply("tu ne peux pas combattre sans point de vie!");
  let attackMonster = hostile.attributs.strength - playerStats.spirit;
  let monsterHealth = hostile.attributs.hp;

  if (attackMonster < 0) {
    attackMonster = 0
  }

  for (let i = 1; monsterHealth > 0; i++) {
    let luck = Math.floor(Math.random() * 10) + 1;
    let attackPlayer = playerStats.strength;

    if (luck >= 1 && luck <= playerStats.agility) {
      message.channel.send(`**Quelle agilité** Tu attaques pour ${attackPlayer} de dégâts et ${hostile.name} ne peut rien faire! Il reste ${monsterHealth}pv à ${hostile.name}.`);
      monsterHealth -= attackPlayer;
    }

    if (luck >= 1 && luck <= playerStats.intelligence) {
      attackPlayer = playerStats.intelligence * playerStats.strength;
      monsterHealth -= attackPlayer;
      player.hp -= attackMonster;
    } else {
      monsterHealth -= attackPlayer;
      player.hp -= attackMonster;
    }

    if (player.hp <= 0) {
      player.hp = 0;
      client.updateRpg(message.member, {
        hp: player.hp
      });
      return message.reply("t'mort!");      
    }
    if (monsterHealth <= 0) {
      player.coins += hostile.coins;
      player.experience += hostile.experience;

      if (player.experience >= player.level * 30) {
        player.experience -= player.level * 30;
        player.level += 1;
        player.coins +=  player.level * 10;
        client.updateRpg(message.member, {
          level: player.level,
          experience: player.experience,
          coins: player.coins,  
        });
        message.reply(`bravo à toi, tu viens de monter niveau ***${player.level}*** sur le RPG! Incroyable!\nTu obtiens ${player.level * 10}💰.`);
      }

      client.updateRpg(message.member, {
        hp: player.hp,
        coins: player.coins,
        experience: player.experience,
      });

      return message.channel.send(`Félicitation, la bataille est terminé après ${i} tours, il te reste ${player.hp}pv et tu gagnes ${hostile.coins}💰 ainsi que ${hostile.experience} points d'expérience en RPG!`);
    }

    message.channel.send(`Tour ${i}: la bataille fait rage. ${hostile.name} attaque pour ${attackMonster} de dégâts et tu ripostes pour ${attackPlayer} dégâts! Il reste ${monsterHealth}pv à ${hostile.name}.`);
  }
}

module.exports = {
  calculateUserAttributs,
  battle,
};
