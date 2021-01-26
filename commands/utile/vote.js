module.exports.run = async (client, message) => {
  message.channel.send(`__**Voter signifie que vous supportez le bot, vous pouvez le faire en cliquant ici:**__ https://top.gg/bot/772244986796048415\nUn grand merci à tout ceux qui le feront ! 🤩`);

  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "vote",
  aliases: ['vote'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Lien pour voter pour le bot",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};