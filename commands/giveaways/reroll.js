const ms = require('ms');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(':x: Vous devez avoir des autorisations de gestion des messages pour relancer les giveaways.');
    
    if(!args[0]) return message.channel.send(':x: Vous devez spécifier un ID de message valide!');
    
    let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway) return message.channel.send('Impossible de trouver un cadeau pour `'+ args.join(' ') +'`.');

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('Giveaway relancer!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send("Ce giveaway n'est pas terminé!");
        } else {
            console.error(e);
            message.channel.send("Une erreur s'est produite...");
        }
    });
    message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "reroll",
  aliases: ['reroll', 'rgive'],
  category: 'giveaways',
  displayName: '🎉 Giveaways',
  description: "Relance un giveaway",
  cooldown: 10,
  usage: '<message_ID | nom cadeau>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};