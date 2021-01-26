const { createCanvas, loadImage } = require("canvas");
const { MessageAttachment } = require("discord.js");

module.exports.run = async (client, message, args, data, userInfo) => {
  let member = client.getMember(message, args.join(" ")) || message.member;

  if (!member)
    return message.reply("l'utilisateur n'existe pas.");

  const users = await client.getUsers(member);
  const rang = users.sort((a, b) => (client.getExperience(a.level, a.experience) < client.getExperience(b.level, b.experience))? 1 : -1).map(e => e.id).indexOf(message.member.id) + 1;

  const canvas = createCanvas(800, 333);
  const ctx = canvas.getContext("2d");
  const background = await loadImage("./assets/img/exp.jpg");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = "#000";
  ctx.fillRect(80, 180, 650, 90);
  ctx.globalAlpha = 1;
  ctx.strokeRect(80, 180, 650, 90);

  ctx.fillStyle = "#ffef00";
  ctx.globalAlpha = 0.8;
  ctx.fillRect(81, 179, (100 / (Math.pow(userInfo.level, 2) * 10) * userInfo.experience) * 6.5, 90);

  ctx.globalAlpha = 1;
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.fillText(`${userInfo.experience} / ${Math.pow(userInfo.level, 2) * 10}`, 400, 240);

  ctx.font = "40px Arial Black";
  ctx.textAlign = "left";
  ctx.fillText(member.user.tag, 80, 100);
  ctx.fillText(`Niveau: ${userInfo.level} / Rang: ${rang}`, 80, 150);


  const attachement = new MessageAttachment(canvas.toBuffer(), "exp.png");
  message.channel.send(attachement);
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "exp",
  aliases: ['exp', 'experience'],
  category: 'utilisateur',
  displayName: '👥 Utilisateur',
  description: "Renvoie l'expérience de l'utilisateur!",
  cooldown: 1,
  usage: '[<@user | id | username>]',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: true,
  rpg: false
};