const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message) => {
  let msg = await message.channel.send("`Veuillez patientez...`");
  
  const anime = await fetch("https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500")
    .then(res => res.json())
    .then(json => json.data.children);

  const img = anime[Math.floor(Math.random() * anime.length)].data;
  
  const embed = new MessageEmbed()
    .setDescription(`**${img.title}**`)
    .setImage(img.url)
    .setFooter("Powered by r/animemes");
  
  message.channel.send(embed);
  msg.delete();
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "anime",
  aliases: ['anime', 'memes'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Renvoie des memes de type anime",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};