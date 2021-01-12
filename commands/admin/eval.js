module.exports.run = async (client, message, args) => {
  function clean(text) {
    if (typeof text === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }

  if (!args.length) return;
  if (message.author.id !== "467387227148779530") return;
  const code = args.join(" ");
  const evaled = eval(code);
  const cleanCode = await clean(evaled);
  message.channel.send(cleanCode, { code: "js" });

  message.delete();
};

module.exports.help = {
  name: "eval",
  aliases: ['eval'],
  category: 'admin',
  displayName: '⚙️ Admin',
  description: "Renvoie un code javascript testé",
  cooldown: 3,
  usage: '<code_à_tester>',
  isUserAdmin: false,
  permissions: true,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};