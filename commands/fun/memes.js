const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message) => {
  let msg = await message.channel.send("`Génération du meme...`");

  const meme = await fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(json => json.data.memes);

    const img = meme[Math.floor(Math.random() * meme.length)];
  
  const embed = new MessageEmbed()
    .setDescription(`**${img.name}**`)
    .setImage(img.url)
    .setFooter("Powered by https://api.imgflip.com");

  message.channel.send(embed);
  msg.delete();
  message.delete();
};

module.exports.help = {
  name: "memes",
  aliases: ['memes', 'meme'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Renvoie un meme",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};