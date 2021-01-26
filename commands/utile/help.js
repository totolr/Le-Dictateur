const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');
const lsv = require("../../assets/help/help.json");

module.exports.run = async (client, message, args, data) => {
  const categoryListWithoutAdmin = categoryList.filter(file => file !== 'admin'); 

  if (!args.length) {
    const embed = new MessageEmbed()
      .setColor("#ffef00")
      .addField("📋 Liste des commandes 📋", `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${data.prefix}help <nom_commande>\`.\nPour plus d'informations sur une catégorie, tapez \`${data.prefix}help <nom_catégorie>\`.`)

    for (const category of categoryListWithoutAdmin) {
      let arrayTitle = client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.displayName);
      embed.addField(
        `${arrayTitle[1]}`,
        `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`, true
      );
    };

    const infoLsv = lsv[Math.floor(Math.random() * lsv.length)];

    embed.addField(
      `💡 LE SAVIEZ-VOUS !`,
      `${infoLsv.lsv.replace('{{prefix}}', `${data.prefix}`)}`, false
    );
    
    embed.addField(
      `Si vous avez un problème avec le bot nous vous invitons à vous rendre sur le serveur support`,
      `[Support](https://discord.gg/q7uhPKb) | [Invite moi !](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Votez pour moi !](https://top.gg/bot/772244986796048415)`, false
    );

    message.delete({ timeout: 5000 }).catch(console.error);
    return message.channel.send(embed);
  } else if (categoryList.find(cat => cat == args.join(" ").toLowerCase()) != undefined){
    const commands = client.commands.filter(cmd => cmd.help.category == args.join(" ").toLowerCase());

    let embed = new MessageEmbed()
      .addField(`📋 Liste des commandes \`${categoryList.find(cat => cat == args.join(" ").toLowerCase())}\` 📋`, `Une liste de toutes les commandes ${categoryList.find(cat => cat == args.join(" ").toLowerCase())} disponibles et leurs descriptions.\nPour plus d'informations sur une commande, tapez \`${data.prefix}help <nom_commande>\`.`)
      .setColor("#ffef00");

    commands.forEach((cmd) => {
      embed.addField(
        `**${data.prefix}${cmd.help.name} ${cmd.help.aliases.length > 1 ? `(${cmd.help.aliases})` : ""}**`,
        `${cmd.help.description}`,
        true
      );
    });

    embed.addField(
      `Si vous avez un problème avec le bot nous vous invitons à vous rendre sur le serveur support`,
      `[Support](https://discord.gg/q7uhPKb) | [Ajoute le bot à ton serveur](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`, false
    );

    message.delete({ timeout: 5000 }).catch(console.error);
    return message.channel.send(embed);
  } else {
    const command = client.commands.get(args[0])  || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if (!command) return message.reply("cette commande/catégorie n'exste pas!");

    const embed = new MessageEmbed()
      .setColor("#ffef00")
      .setTitle(`**Informations sur la commande :** \`${command.help.name}\``)
      .addField("Description", `${command.help.description} (cd: ${command.help.cooldown} secs)`)
      .addField("Utilisation", command.help.usage ? `${data.prefix}${command.help.name} ${command.help.usage}` : `${data.prefix}${command.help.name}`, true)

    if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
    message.delete({ timeout: 5000 }).catch(console.error);
    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  aliases: ['help'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Renvoie une liste de commandes ou les informations sur une seule!",
  cooldown: 1,
  usage: '[<nom_commande | nom_catégorie>]',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};