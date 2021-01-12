const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message) => {
  let msg = await message.channel.send("`Veuillez patientez...`");

  const dog = await fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(json => json.message);
  
  const embed = new MessageEmbed()
    .setImage(dog)
    .setFooter("Powered by https://dog.ceo/api/breeds/image/random");

  message.channel.send(embed);
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "dog",
  aliases: ['dog', 'chien'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Renvoie une image de chien",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};