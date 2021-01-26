const ms = require('ms');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(':x: Vous devez avoir des autorisations de gestion des messages pour terminer les giveaways.');

    if(!args[0]) return message.channel.send(':x: Vous devez spécifier un ID de message valide!');

    let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway) return message.channel.send('Impossible de trouver un cadeau pour `'+ args.join(' ') + '`.');

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send('Le giveaway se terminera dans moins de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send('Ce giveaway est déjà terminé!');
        } else {
            console.error(e);
            message.channel.send("Une erreur s'est produite...");
        }
    });
    message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "end",
  aliases: ['end', 'egive'],
  category: 'giveaways',
  displayName: '🎉 Giveaways',
  description: "Termine un giveaway",
  cooldown: 10,
  usage: '<message_ID | nom cadeau>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};