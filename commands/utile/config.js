module.exports.run = async (client, message, args, data) => {
  if (!args[0]) return message.reply(`Voici comment utiliser la commande \`${data.prefix}config\`:\n\`${data.prefix}config prefix <nouvelle_valeur>\` permet de changer le prefix\n\`${data.prefix}config logchannel <#channel>\` permet de changer de logchannel\n\`${data.prefix}config exp <oui/non>\` permet de activer ou non l'exp sur le serveur\n\`${data.prefix}config rpg <oui/non>\` permet de activer ou non le mini-rpg sur le serveur\n\`${data.prefix}config giveaways <oui/non>\` permet de activer ou non la mention lors d'un giveaway\n\`${data.prefix}config expchannel <#channel>\` permet de définir un salon où sont envoyer les messages lors d'une montée de niveau`)

  const getSetting = args[0];
  const newSetting = args.slice(1).join(" ");
  const logchannel = message.guild.channels.cache.get(data.logchannel) != undefined ? message.guild.channels.cache.get(data.logchannel) : "aucun salon";
  const expchannel = message.guild.channels.cache.get(data.expchannel) != undefined ? message.guild.channels.cache.get(data.expchannel) : "aucun salon";
  const newChannel = message.mentions.channels.first();

  switch(getSetting) {
    case "prefix": {
      if (newSetting) {
        await client.updateGuild(message.guild, { prefix: newSetting });
        return message.channel.send(`Prefix mis à jour: \`${data.prefix}\` -> \`${newSetting}\``);
      }
      message.channel.send(`Prefix actuel: \`${data.prefix}\``);
      break;
    }
    case "logchannel": {
      if (newChannel) {
        await client.updateGuild(message.guild, { logchannel: newChannel.id });
        return message.channel.send(`Logchannel mis à jour: ${logchannel.toString()} -> ${newChannel}`);
      }
      if (newSetting) {
        return message.channel.send(':x: Vous devez mentionner un channel valide!');
      }
      message.channel.send(`Logchannel actuel: ${channel.toString()}`);
      break;
    }
    case "exp": {
      if (newSetting === 'oui') {
        await client.updateGuild(message.guild, { exp: newSetting });
        return message.channel.send(`Vous avez **activé** l'expérience sur ce serveur!`);
      }
      if (newSetting === 'non') {
        await client.updateGuild(message.guild, { exp: newSetting });
        return message.channel.send(`Vous avez **desactivé** l'expérience sur ce serveur!`);
      }
      message.channel.send(`L'expérience est ${data.exp == 'oui' ? '**activé**' : '**désactivé**'} sur le serveur.`);
      break;
    }
    case "rpg": {
      if (newSetting === 'oui') {
        await client.updateGuild(message.guild, { rpg: newSetting });
        return message.channel.send(`Vous avez **activé** le mini-rpg sur ce serveur!`);
      }
      if (newSetting === 'non') {
        await client.updateGuild(message.guild, { rpg: newSetting });
        return message.channel.send(`Vous avez **desactivé** le mini-rpg sur ce serveur!`);
      }
      message.channel.send(`L'expérience est ${data.rpg == 'oui' ? '**activé**' : '**désactivé**'} sur le serveur.`);
      break;
    }
    case "giveaways": {
      if (newSetting === 'oui') {
        await client.updateGuild(message.guild, { giveaways: newSetting });
        return message.channel.send(`Vous avez **activé** la mention lors d'un giveaway!`);
      }
      if (newSetting === 'non') {
        await client.updateGuild(message.guild, { giveaways: newSetting });
        return message.channel.send(`Vous avez **desactivé** la mention lors d'un giveaway!`);
      }
      message.channel.send(`La mention est ${data.giveaways == 'oui' ? '**activé**' : '**désactivé**'} sur le serveur lors d'un giveaway.`);
      break;
    }
    case "expchannel": {
      if (newChannel) {
        await client.updateGuild(message.guild, { expchannel: newChannel.id });
        return message.channel.send(`Expchannel mis à jour: ${expchannel.toString()} -> ${newChannel}`);
      }
      if (newSetting) {
        return message.channel.send(':x: Vous devez mentionner un channel valide!');
      }
      message.channel.send(`Expchannel actuel: ${channel.toString()}`);
      break;
    }
  }
};

module.exports.help = {
  name: "config",
  aliases: ['config'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Configure le bot pour ton serveur!",
  cooldown: 10,
  usage: '<prefix/logchannel/exp/rpg> [<nouvelle_valeur>]',
  isUserAdmin: false,
  permissions: true,
  args: false,
  logchannel: false,
  exp: false,
  rpg: false
};