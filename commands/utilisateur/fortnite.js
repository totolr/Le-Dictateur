const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
const config = require("../../config");
const ft = new Client(config.FORTNITE);

module.exports.run = async (client, message, args) => {
  const platforms = ["pc", "xb1", "psn"];

  if (args[0].toLowerCase() === "store") {
    const store = await ft.store();

    const embed = new MessageEmbed()
      .setTitle("🛍️ Boutique Fortnite 🛍️")
      .setColor("#9d4dbb")
      .setFooter(`${client.user.username} - Fortnite Store`);

    store.sort((a, b) => {
      return b.vbucks - a.vbucks;
    });

    store.forEach(el => {
      embed.addField(el.name, stripIndents`**- Rareté:** ${el.rarity}
                **- Prix:** ${el.vbucks} v-bucks
                **- Image:** [Clique ici](${el.image})`, true)
    });

    message.channel.send(embed);
  } else {
    const lastWord = args[args.length - 1].toLowerCase();

    let platform, username;

    if (platforms.includes(lastWord)) {
      username = args.slice(0, args.length - 1).join(" ");
      platform = lastWord;
    } else {
      username = args.join(" ");
      platform = "pc";
    }

    const search = await ft.user(username, platform);

    if (!search.username) {
      return message.channel.send("Impossible de trouver cette personne, réessayez")
        .then(m => m.delete(5000));
    }

    const lifetime = search.stats.lifetime;
    const solo = search.stats.solo;
    const duo = search.stats.duo;
    const squad = search.stats.squad;

    const embed = new MessageEmbed()
      .setTitle(`🏆 ${search.username} (${search.platform})`)
      .setURL(search.url)
      .setColor("#9d4dbb")
      .setFooter(`${client.user.username} - Fortnite Stats`)
      .addField("🥇 Solo:", stripIndents`**- Victoire:** ${solo.wins}
                **- KD:** ${solo.kd}
                **- Kills:** ${solo.kills}
                **- Kills par partie:** ${solo.kills_per_match}`, true)
      .addField("✌️ Duo:", stripIndents`**- Victoire:** ${duo.wins}
                **- KD:** ${duo.kd}
                **- Kills:** ${duo.kills}
                **- Kills par partie:** ${duo.kills_per_match}`, true)
      .addField("👨‍👩‍👧‍👦 Squad:", stripIndents`**- Victoire:** ${squad.wins}
                **- KD:** ${squad.kd}
                **- Kills:** ${squad.kills}
                **- Kills par partie:** ${squad.kills_per_match}`, true)
      .addField("💯 Lifetime:", stripIndents`**- Victoire:** ${lifetime.wins}
                **- KD:** ${lifetime.kd}
                **- Kills:** ${lifetime.kills}`, false)

    message.channel.send(embed)
  }
  message.delete({ timeout: 5000 }).catch(console.error);
};

module.exports.help = {
  name: "fortnite",
  aliases: ['fortnite', 'ft'],
  category: 'utilisateur',
  displayName: '👥 Utilisateur',
  description: "Afficher les statistiques de quelqu'un et le magasin actuel!",
  cooldown: 1,
  usage: '<username | store> [<plateforme (pc, xb1, psn)>]',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};