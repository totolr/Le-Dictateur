const { MessageEmbed } = require("discord.js");
const chooseArr = ["👊", "📰", "✂"];

module.exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setColor("#ffef00")
    .setTitle("Choisis une réaction ci-dessous !")
    .setFooter(`${client.user.username} - Rps`)
    .setDescription("Tu as 30 secondes pour te décider.")

  const m = await message.channel.send(embed);
  const reacted = await client.promptMessage(m, message.author, 30, chooseArr);

  const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

  const result = await getResult(reacted, botChoice);
  await m.reactions.removeAll();
  
  let color;
  if (result === "Tu as gagné !") {
    color = "#00ff00";
  } else if (result === "Egalité !") {
    color = "#f5f5f5";
  } else {
    color = "#ff0000";
  }

  embed
    .setColor(color)
    .setTitle("")
    .setDescription("")
    .addField(result, `${reacted} vs ${botChoice}`);

  m.edit(embed);

  function getResult(me, clientChosen) {
    if ((me === "👊" && clientChosen === "✂") ||
      (me === "📰" && clientChosen === "👊") ||
      (me === "✂" && clientChosen === "📰")) {
      return "Tu as gagné !";
    } else if (me === clientChosen) {
      return "Egalité !";
    } else {
      return "Tu as perdu !";
    }
  }
  message.delete({ timeout: 5000 }).catch(console.error);
}

module.exports.help = {
  name: "rps",
  aliases: ['rps', 'pfc'],
  category: 'fun',
  displayName: '⚽ Fun',
  description: "Jeu du pierre feuille papier ciseaux.",
  cooldown: 1,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};