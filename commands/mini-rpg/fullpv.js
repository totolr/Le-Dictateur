module.exports.run = async(client, message, args, data, userInfo, userRpg) => {
  const dailyCD = 8.64e+7;

  const lastDaily = await userRpg.daily;
  if (lastDaily !== null && dailyCD - (Date.now() - lastDaily) > 0) {
    const cdTime = dailyCD - (Date.now() - lastDaily);
    message.reply(`il te reste ${Math.floor(cdTime / (1000*60*60) % 24)}hrs, ${Math.floor(cdTime / (1000*60) % 60)}mins et ${Math.floor(cdTime / (1000) % 60)}secs avant de récuperer toute ta vie.`)
  } else {
    client.updateRpg(message.member, { daily: Date.now(), hp: 50});
    message.reply(`Tu as toute ta vie, tu peux continuer ton avanture!`);
  }
};

module.exports.help = {
  name: "fullpv",
  aliases: ['fullpv', 'full', 'pv'],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Remplir sa vie pour continuer l'aventure!",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: true
};