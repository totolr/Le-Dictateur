const { Collection, MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (message.channel.id === '792485852533096499') return;

  let data = await client.getGuild(message.guild);
  const userRpg = await client.getRpg(message.member);

  let position = data.users.map(e => e.id).indexOf(message.member.id);
  let userInfo = data.users[position];

  if (message.guild && position == -1) {
    await client.createUserProfile(message.member, message.guild);
    data = await client.getGuild(message.guild);
    position = data.users.map(e => e.id).indexOf(message.member.id);
    userInfo = data.users[position];
  } else if (data.exp === 'oui') {
    const expCd = Math.floor(Math.random() * 19) + 1;
    const expToAdd = Math.floor(Math.random() * 25) + 10;

    if (expCd >= 8 && expCd <= 11) { 
      await client.addExp(client, message.member, expToAdd, message.guild);
    };

    if (userInfo.experience >= Math.pow(userInfo.level, 2) * 10) {
      userInfo.experience -= Math.pow(userInfo.level, 2) * 10;
      userInfo.level += 1;
      client.updateUserInfo(message.guild, message.member, {
        "users.$.level": userInfo.level,
        "users.$.experience": userInfo.experience
      });
      if (client.channels.cache.get(data.expchannel) != undefined) {
        client.channels.cache.get(data.expchannel).send(`Bravo ${message.author}, tu viens de monter niveau ***${userInfo.level}***! Incroyable!`);
      } else {
        message.reply(`bravo à toi, tu viens de monter niveau ***${userInfo.level}***! Incroyable!`);
      }
    }
  } 

  if (message.mentions.users.get(client.user.id) != undefined) message.channel.send(`Olala! ${message.member.user} tu oses me mentionnez? Ne recommence plus JAMAIS!!!`);
  
  if (!message.content.startsWith(data.prefix)) return;

  const args = message.content.slice(data.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();
  
  const command = client.commands.get(commandName)  || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) {
    const commandNotFind = new MessageEmbed()
    .setTitle(":x: Erreur")
    .setColor("#fe2712")
    .setDescription(`**La commande ${message.content.split(/ +/, 1).toString()} n'as pas été trouvé !**`);

    message.delete({ timeout: 5000 }).catch(console.error);
    return message.channel.send(commandNotFind);
  };

  if (command.help.exp && data.exp == 'non') {
    return message.channel.send("L'expérience a été **désactivé** sur le serveur!");
  };

  if (command.help.rpg && data.rpg == 'non') {
    return message.channel.send("Le mini-rpg a été **désactivé** sur le serveur!");
  } else if (command.help.rpg && userRpg.class == '' && command.help.name != 'setup') {
    return message.channel.send(`Faites la commande \`${data.prefix}setup\` pour commencer l'aventure!`);
  };
  
  if (command.help.logchannel && client.channels.cache.get(data.logchannel) == undefined) {
    message.guild.channels.create('ld-logs', { reason: "Utilisation d'une commande de modération!", permissionsOverwrites: [{deny: ['SEND_MESSAGES','ADD_REACTIONS']}]})
      .then( channel => {
        client.updateGuild(message.guild, { logchannel: channel.id })
      })
      .catch(console.error);
  };

  if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas les permissions pour taper cette commande!");

  if(command.help.args && !args.length) {
    let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

    if(command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${data.prefix}${command.help.name} ${command.help.usage}\``

    return message.channel.send(noArgsReply)
  };

  if(command.help.isUserAdmin && !user) return message.reply('il faut mentionner un utilisateur.');

  if (command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply(`tu ne peux pas utiliser la commande \`${data.prefix}${command.help.name}\` sur cet utilisateur!`);

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  };

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.reply(`merci d'attendre **${timeLeft.toFixed(0)}** seconde(s) avant de ré-utiliser la commande \`${data.prefix}${command.help.name}\`.`);
    }
  };

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args, data, userInfo, userRpg);
}