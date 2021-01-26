const { canModifyQueue } = require("../../util/music");

module.exports.run = (client, message) => {
  const queue = client.queue.get(message.guild.id);
  if (!queue)
    return message.reply(":x: Il n'y a rien que je pourrais skip pour vous.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  queue.playing = true;
  queue.connection.dispatcher.end();
  queue.textChannel.send(`${message.author} ⏭ a passé la chanson`).catch(console.error);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "skip",
  aliases: ['skip', 'passer'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Skip la musique en cours",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};