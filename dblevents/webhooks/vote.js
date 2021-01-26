const { MessageEmbed } = require("discord.js");

module.exports = async (client, vote) => {
  console.log(vote);
  
  let username;
  await client.users.fetch(vote.user).then(user => {
    username = user.tag;
    const embed = new MessageEmbed()
    .setColor("#1cac78")
    .setDescription(`${username} a upvote ${client.user.username} !`);
    client.channels.cache.get('776577092501897226').send(embed);
  }).catch(console.error);
}