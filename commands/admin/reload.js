module.exports.run = async (client, message, args) => {
  if (message.author.id !== "467387227148779530") return;
  await message.delete();
  await client.channels.cache.get('773329816434376724').send("Le bot redémarre!");
  process.exit();
};

module.exports.help = {
  name: "reload",
  aliases: ['reload'],
  category: 'admin',
  displayName: '⚙️ Admin',
  description: "Relancer le bot",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: true,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};