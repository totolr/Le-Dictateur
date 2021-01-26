const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message) => {
  let msg = await message.channel.send("`Veuillez patientez...`");

  const cat = await fetch("http://aws.random.cat/meow")
    .then(res => res.json())
    .then(json => json.file);
  
  const embed = new MessageEmbed()
    .setImage(cat)
    .setFooter("Powered by http://aws.random.cat/meow");

  message.channel.send(embed);
  msg.delete();
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "cat",
  aliases: ['cat', 'chat'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Renvoie une image de chat",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};