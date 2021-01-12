module.exports.run = async (client, message, args, data, userInfo, userRpg) => {
  const getter = await client.getRpg(message.guild.member(message.mentions.users.first()));
  const monnaie = parseInt(args[1]);
  if (userRpg.coins < monnaie) return message.reply(`vous n'avez pas assez d'argent pour ça! (${userRpg.coins}) < ${monnaie}`);

  if (getter && (!isNaN(monnaie))) {
    try {
      message.channel.send(`Confirmer-vous le paiement de \`${monnaie}\`💰 à ${message.guild.member(message.mentions.users.first())}? (oui)`);
      const filter = m => (message.author.id === m.author.id);
      const userEntry = await message.channel.awaitMessages(filter, { max: 1, time: 5000, errors: ['time']});
      if (userEntry.first().content.toLowerCase() === "oui") {
        const getterCoins = getter.coins + monnaie;
        const emitterCoins = userRpg.coins - monnaie;

        client.updateRpg(message.member, {
          coins: emitterCoins
        });
        client.updateRpg(getter, {
          coins: getterCoins
        });

        message.channel.send(`Merci pour votre échange, votre balance est maintenant de: \`${userRpg.coins - monnaie}\`💰`);
      }
    } catch(e) {
      message.channel.send("Achat annulé. Merci de confirmer votre échange en répondant \`oui\` la prochaine fois.")
    }
  } else {
    message.reply("Merci de mentionner la personne que vous désirez payer et le montant!");
  }
};

module.exports.help = {
  name: "trade",
  aliases: ['trade', 'echange'],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Faire un échange avec un utilisateur.",
  cooldown: 10,
  usage: '<@user> <argent>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: true
};