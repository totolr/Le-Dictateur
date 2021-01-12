const classes = require("../../assets/rpg/classes.json");

module.exports.run = async (client, message, args, data, userInfo, userRpg) => {
  if (userRpg && userRpg.class !== "") return message.reply(":x: Tu ne peux pas taper plusieurs fois cette commande!");
  
  const q = args.join(" ");
  const position = classes
    .map((e) => e.name.toLowerCase())
    .indexOf(q.toLowerCase());
  if (q && position == -1) message.reply("Cette classe n'existe pas!");

  if (q && position !== -1) {
    try {
      const classe = classes[position];
      message.channel.send(
        `Voulez-vous vraiment choisir ${classe.name}? (\`oui\` pour confirmer)`
      );
      const filter = (m) => message.author.id === m.author.id;
      const userEntry = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 5000,
        errors: ["time"],
      });

      if (userEntry.first().content.toLowerCase() === "oui") {        
        const messageDM = `${message.member.user}, voici un rapide tutoriel pour le **mini-rpg**:\n\n__**LE BUT**__ :\n\nLe but de cette aventure que va vous demander du temps, de la patience et de l'intelligence est de me mettre à terre. Oui, moi Le Dictateur! Je contrôle le monde et ce n'est pas une petite poussière comme vous qui allez m'en empêcher. A vous de me prouvez que j'ai tord (ou pas). 😈\n\n__**LES COMMANDES**__ :\n\n\`${data.prefix}profil\` affiche votre profile\n\`${data.prefix}battle\` permet de faire un combat contre différents monstres (dont Le Dictateur)\n\`${data.prefix}shop\` la boutique du mini-rpg, on y retrouve armures, armes etc\n\`${data.prefix}fullpv\` permet de regagner tout ces PV (cd: 24h)\n\`${data.prefix}equip\` permet d'équiper un objet acheter\n\`${data.prefix}unequip\` déséquiper un objet\n\`${data.prefix}trade\` permet de faire un échange d'argent avec quelqu'un\n\`${data.prefix}lvl\` affiche une carte avec votre expérience et votre level\n\n_Note du créateur: le mini-prg est en cours de développement mais je travaille activement dessus pour l'améliorer. J'espère que cette aventure vous plaira. **Bonne chance!**_`
        
        await client.createRpg({userID: message.member.id, description: classe.description, class: classe.name, attributs: classe.attributs}); 
        message.channel.send(`Votre profil a été créé, vous êtes maintenant un \`${classe.name}\`!`);
        message.member.createDM().then(channel => {
          channel.send(messageDM);
        }).catch(console.error);
      }
    } catch (e) {
      message.channel.send(
        "Vous avez pris trop de temps pour choisir votre classe!"
      );
    }
  } else {
    message.channel.send(
      `Veuillez choisir votre classe (syntax : \`${data.prefix}setup nom_de_la_classe\`)! Les classes disponibles: ${classes
        .map((e) => `${e.name}`)
        .join(", ")}`
    );
  }
};

module.exports.help = {
  name: "setup",
  aliases: ["setup"],
  category: 'mini-rpg',
  displayName: '🤠 Mini-Rpg (Béta)',
  description: "Créer le profil de votre personnage",
  cooldown: 3,
  usage: "<nom_personnage>",
  isUserAdmin: false,
  permissions: false,
  args: false,
  logchannel: false,
  exp: false,
  rpg: true
};
