const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message) => {
  let msg = await message.channel.send("`Veuillez patientez...`");

  const fox = await fetch("https://randomfox.ca/floof/")
    .then(res => res.json())
    .then(json => json.image);
  
  const embed = new MessageEmbed()
    .setImage(fox)
    .setFooter("Powered by https://randomfox.ca/floof/");

  message.channel.send(embed);
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "fox",
  aliases: ['fox', 'renard'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Renvoie une image de renard",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};