const { createCanvas, loadImage } = require("canvas");
const { MessageAttachment } = require("discord.js");

module.exports.run = async (client, message, args, data, userInfo, userRpg) => {
  const canvas = createCanvas(800, 333);
  const ctx = canvas.getContext("2d");
  const background = await loadImage("./assets/img/lvlrpg.jpg");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = "#000";
  ctx.fillRect(80, 180, 650, 90);
  ctx.globalAlpha = 1;
  ctx.strokeRect(80, 180, 650, 90);

  ctx.fillStyle = "#860111";
  ctx.globalAlpha = 0.8;
  ctx.fillRect(81, 179, (100 / (userRpg.level * 30) * userRpg.experience) * 6.5, 90);

  ctx.globalAlpha = 1;
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.fillText(`${userRpg.experience} / ${userRpg.level * 30}`, 400, 240);

  ctx.font = "bold 40px arial black";
  ctx.fillStyle = "#860111";
  ctx.textAlign = "left";
  ctx.fillText(message.member.user.tag, 80, 100);
  ctx.fillText(`${userRpg.class} de niveau ${userRpg.level}`, 80, 150);

  const attachement = new MessageAttachment(canvas.toBuffer(), "lvl.png");
  message.channel.send(attachement);
};

module.exports.help = {
  name: "lvl",
  aliases: ['lvl', 'rpgexp'],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Renvoie l'expérience de l'utilisateur en RPG!",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: true
};