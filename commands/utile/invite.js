module.exports.run = async (client, message) => {
  message.channel.send(`BOT discord français multi-serveur avec musique, mini-rpg, système d'expérience et plein d'autres commandes funs et de modération ! 🥳\n\n__**N'hésite pas à m'inviter grâce au lien ci-dessous ! ✅**__\n--> http://bit.ly/Le-Dictateur <--\n\n__**Tu peux aussi rejoindre mon serveur de support, il y a des évenements et des giveaways d'oragniser ! 😉**__\n--> https://discord.gg/XyNerQ6ZXX <--`);

  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "invite",
  aliases: ['invite'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Lien pour inviter le bot sur un serveur",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};