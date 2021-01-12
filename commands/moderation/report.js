const { MessageEmbed } = require("discord.js");

const ifFirstCharNumeric = c => /\d/.test(c);

module.exports.run = async (client, message, args, data) => {
  let user = message.mentions.users.first();
  let raison = args[1];

  if (!raison) return message.reply("Indiquer une raison!");

  if (!message.mentions.users.first() && client.users.cache.get(args[0]) != undefined) {
    user = client.users.cache.get(args[0]);
  } else if (!message.mentions.users.first() && client.users.cache.get(args[0]) == undefined) {
    return message.reply("l'utilisateur n'existe pas.")
  }

  if (message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply(`tu ne peux pas utiliser la commande \`${data.prefix}report\` sur cet utilisateur!`)

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL)
    .addFields(
      { name: "Reporté", value: user.username, inline: true},
      { name: "Lien du messgae", value: ifFirstCharNumeric(raison.charAt(0)) ? `[Clique ici!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${args[1]})` : 'Aucun lien précisé', inline: true},
      { name: "Raison", value: ifFirstCharNumeric(raison.charAt(0)) ? args.slice(args.indexOf(args[2])).join(" ") : args.slice(args.indexOf(args[1])).join(" ") }
    )
    .setTimestamp()
    .setFooter("Cette commande est inutilement difficile!");

  client.channels.cache.get(data.logchannel).send(embed);
  message.reply("Votre demande est en cours de traitement!");
  message.delete();
};

module.exports.help = {
  name: "report",
  aliases: ['report'],
  category: 'moderation',
  displayName: '🛠️ Moderation',
  description: "Report un membre",
  cooldown: 3,
  usage: '<@user | ID> [<messageID>] <raison>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: true,
  exp: false,
  rpg: false
};