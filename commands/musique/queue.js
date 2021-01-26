const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
  const permissions = message.channel.permissionsFor(message.client.user);
  if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
    return message.reply("Il manque l'autorisation de gérer les messages ou d'ajouter des réactions");

  const queue = client.queue.get(message.guild.id);
  if (!queue) return message.channel.send("❌ **Rien ne joue sur ce serveur**");

  let currentPage = 0;
  const embeds = generateQueueEmbed(message, queue.songs);

  const queueEmbed = await message.channel.send(
    `**Page actuelle - ${currentPage + 1}/${embeds.length}**`,
    embeds[currentPage]
  );

  try {
    await queueEmbed.react("⬅️");
    await queueEmbed.react("⏹");
    await queueEmbed.react("➡️");
  } catch (error) {
    console.error(error);
    message.channel.send(error.message).catch(console.error);
  }

  const filter = (reaction, user) =>
    ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
  const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

  collector.on("collect", async (reaction, user) => {
    try {
      if (reaction.emoji.name === "➡️") {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          queueEmbed.edit(`**Page actuelle - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
        }
      } else if (reaction.emoji.name === "⬅️") {
        if (currentPage !== 0) {
          --currentPage;
          queueEmbed.edit(`**Page actuelle - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
        }
      } else {
        collector.stop();
        reaction.message.reactions.removeAll();
      }
      await reaction.users.remove(message.author.id);
    } catch (error) {
      console.error(error);
      return message.channel.send(error.message).catch(console.error);
    }
  });
  message.delete({ timeout: 5000 }).catch(console.error);
}

function generateQueueEmbed(message, queue) {
  const embeds = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");
    const embed = new MessageEmbed()
      .setTitle("Song Queue\n")
      .setThumbnail(message.guild.iconURL())
      .setColor("#800080")
      .setDescription(`**Morceau en cours - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
      .setTimestamp();
    embeds.push(embed);
  }
  return embeds;
}

module.exports.help = {
  name: "queue",
  aliases: ['queue', 'q'],
  category: 'musique',
  displayName: '🎵 Musique',
  description: "Affiche la fille d'attente",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};