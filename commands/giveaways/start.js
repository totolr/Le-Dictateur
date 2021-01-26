const ms = require('ms');

module.exports.run = async (client, message, args, data) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(':x: Vous devez avoir des autorisations de gestion des messages pour commencer les giveaways.');

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel) return message.channel.send(':x: Vous devez mentionner un channel valide!');

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send(':x: Vous devez spécifier une durée valide!');

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) return message.channel.send(':x: Vous devez spécifier un nombre valide de gagnants!');

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize) return message.channel.send(':x: Vous devez spécifier un cadeau valide!');

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: data.giveaways === 'oui' ? message.author : null,
        messages: {
            giveaway: (data.giveaways === 'oui' ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (data.giveaways === 'oui' ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY TERMINÉ** 🎉🎉",
            timeRemaining: "Temps restant: **{duration}**!",
            inviteToParticipate: "Réagissez avec 🎉 pour participer!",
            winMessage: "Félicitations, {winners}! Tu as gagné **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway annulé, aucune participation valide.",
            hostedBy: "Hébergé par: {user}",
            winners: "gagnant(s)",
            endedAt: "Terminé à",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false
            }
        }
    });

    message.channel.send(`Le giveaway a commencé en ${giveawayChannel}!`);
    message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "start",
  aliases: ['start', 'sgive'],
  category: 'giveaways',
  displayName: '🎉 Giveaways',
  description: "Démarre un giveaway",
  cooldown: 10,
  usage: '<#channel> <temps> <nombre_gagnant> <cadeau>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};