const { MessageEmbed } = require("discord.js");
const { capitalize } = require("../../functions/string");

module.exports.run = async (client, message, args, data, userInfo, userRpg) => {
  const items = [];
  const shop = require("../../assets/shop/shop.json");
  const q = args.slice(1).join(" ");
  const position = shop
    .map((e) => e.name.toLowerCase())
    .indexOf(q.toLowerCase());
  const item = shop[position];
  const userInventory = userRpg.inventory;

  if (q && position == -1)
    message.reply(
      "cet objet n'existe pas! Vérifier si l'objet se trouve bien dans le magasin!"
    );

  const embed = new MessageEmbed().setTitle("Bienvenue dans notre magasin");

  if (q && position !== -1) {
    if (args[0] == "show") {
      const embed = new MessageEmbed()
        .setTitle(`${item.name} (type: ${item.type})`)
        .setColor(item.color)
        .setThumbnail(item.icon)
        .setDescription(`${item.description} (${item.prix} 💰)`)
        .addField("Attributs", `${Object.entries(item.attributs).map(([key, value]) => `${capitalize(key)}: ${value}`).join(' | ')}`)
        message.channel.send(embed);
    }
    if (args[0] == "buy") {
      if (userRpg.coins < item.prix) return message.reply("tu n'as pas assez de pièces pour ça!");

      try {
        message.channel.send(
          `Confirmer-vous l'achat de \`${item.name.toLowerCase()}\` pour \`${
            item.prix
          }\`💰? (oui)`
        );
        const filter = (m) => message.author.id === m.author.id;
        const userEntry = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 5000,
          errors: ["time"],
        });

        if (userEntry.first().content.toLowerCase() === "oui") {
          const userCoins = userRpg.coins - item.prix;
          client.updateRpg(message.member, {
            coins: userCoins,
          });
          message.channel.send(
            `Merci pour votre achat, votre balance est maintenant de: \`${
              userRpg.coins - item.prix
            }\`💰`
          );
          userInventory.push(item.item);
          client.updateRpg(message.member, {
            inventory: userInventory,
          });
        }
      } catch (e) {
        message.channel.send(
          "Achat annulé. Merci de confirmer votre achat en répondant `oui` la prochaine fois."
        );
      }
    }
    if (args[0] == "sell") {
      try {
        const check = userInventory.indexOf(capitalize(q));
        if (check == -1) return message.reply("tu ne possède pas cet objet!");
        message.channel.send(
          `Confirmer-vous la vente de \`${item.name.toLowerCase()}\` pour \`${
            item.prix
          }\`💰? (oui)`
        );
        const filter = (m) => message.author.id === m.author.id;
        const userEntry = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 5000,
          errors: ["time"],
        });

        if (userEntry.first().content.toLowerCase() === "oui") {
          const userCoins = userRpg.coins + item.prix;
          client.updateRpg(message.member, {
            coins: userCoins,
          });
          message.channel.send(
            `Merci pour votre vente, votre balance est maintenant de: \`${
              userRpg.coins + item.prix
            }\`💰`
          );
          userInventory.splice(check, 1);
          client.updateRpg(message.member, {
            inventory: userInventory,
          });
        }
      } catch (e) {
        message.channel.send(
          "Vente annulée. Merci de confirmer votre vente en répondant `oui` la prochaine fois."
        );
      }
    }
  } else {
    shop.map((e) =>
      items.push(`${e.name} (${e.prix} 💰)`)
    );
    embed.setDescription(
      `Voici les différents objets disponibles:\n${items
        .map((item) => `**${item}**`)
        .join("\n")}`
    );
    embed.addField("Commandes:", `\`${data.prefix}shop show <objet>\` permet de monter l'objet\n\`${data.prefix}shop buy <objet>\` permet d'acheter l'objet\n\`${data.prefix}shop sell <objet>\` permet de vendre l'objet`);
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "shop",
  aliases: ["shop"],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Le magasin!",
  cooldown: 5,
  usage: "[<show | buy | sell>][<objet>]",
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: true
};
