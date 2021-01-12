const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message) => {
  if (!db.get(`musiques_${message.member.user.id}`)) db.set(`musiques_${message.member.user.id}`, []);
  const dbUser = db.get(`musiques_${message.member.user.id}`);
  if (dbUser.length === 0) return message.reply(`Vous n'avez pas de musiques en favoris!`).catch(console.error);
  try {
    let currentPage = 0;
    const embeds = generateFavorisEmbed(message, dbUser);
    const favorisEmbed = await message.channel.send(
      `**Page actuelle - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );
    await favorisEmbed.react("⬅️");
    await favorisEmbed.react("⏹");
    await favorisEmbed.react("➡️");

    const filter = (reaction, user) =>
      ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = favorisEmbed.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            favorisEmbed.edit(`**Page actuelle - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            favorisEmbed.edit(`**Page actuelle - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch {
        return message.channel.send("**Permissions manquantes - [ADD_REACTIONS, MANAGE_MESSAGES]!**");
      }
    });
  } catch {
    return message.channel.send("**Permissions manquantes - [ADD_REACTIONS, MANAGE_MESSAGES]!**");
  }
};

function generateFavorisEmbed(message, favoris) {
  const embeds = [];
  let k = 10;
  for (let i = 0; i < favoris.length; i += 10) {
    const current = favoris.slice(i, k);
    let j = i;
    k += 10;
    const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");
    const embed = new MessageEmbed()
      .setTitle(`Liste des musiques favorites de ${message.member.user.tag}\n`)
      .setThumbnail(message.member.user.avatarURL())
      .setColor("#800080")
      .setDescription(info)
      .setTimestamp();
    embeds.push(embed);
  }
  return embeds;
}

module.exports.help = {
  name: "favoris",
  aliases: ['favoris', 'fav'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Affiche vos favoris",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};