const { MessageEmbed } = require("discord.js");

module.exports = async (client, messageReaction, user) => {
  if (messageReaction.message.guild.id != '727614066247598145') return;

  const message = messageReaction.message;
  const member = message.guild.members.cache.get(user.id);
  const emoji = messageReaction.emoji.name;
  const channelRegle = message.guild.channels.cache.find(c => c.id === '744941637846695956');
  const channelRole = message.guild.channels.cache.find(c => c.id === '789629239267819591');


  const innocentRole = message.guild.roles.cache.get("727943459285106698");


  const eventsRole = message.guild.roles.cache.get("789637868598853682");
  const giveawayRole = message.guild.roles.cache.get("789637954665840650");
  const BOTRole = message.guild.roles.cache.get("792772397954367488");
  const partenaireRole = message.guild.roles.cache.get("792777646337294336");
  const hommeRole = message.guild.roles.cache.get("792783133040312340");
  const femmeRole = message.guild.roles.cache.get("792783184424075284");
  const intersexeRole = message.guild.roles.cache.get("792823265361395743");
  const artisteRole = message.guild.roles.cache.get("792787237778882590");
  const sportRole = message.guild.roles.cache.get("792787372982665229");
  const musiqueRole = message.guild.roles.cache.get("792787400400437299");
  const informatiqueRole = message.guild.roles.cache.get("792787449134579742");
  const animeRole = message.guild.roles.cache.get("792795350473637929");
  const otherPassionsRole = message.guild.roles.cache.get("792787482424115212");


  if (member.user.bot) return;

  if (["verified"].includes(emoji) && message.channel.id === channelRegle.id) {
    switch(emoji) {
      case "verified":
        member.roles.remove(innocentRole);

        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${innocentRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
    };
  };

  if (['🎁', '🔔', '🤖', '🤝', '♂️', '♀️', '⚧', '🎨', '🎯', '🎼', '💻', '🎌', '🎭'].includes(emoji) && message.channel.id === channelRole.id) {
    switch(emoji) {
      case '🎁': {
        member.roles.remove(giveawayRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${giveawayRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '🔔': {
        member.roles.remove(eventsRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${eventsRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '🤖': {
        member.roles.remove(BOTRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${BOTRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '🤝': {
        member.roles.remove(partenaireRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${partenaireRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '♂️': {
        member.roles.remove(hommeRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${hommeRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '♀️': {
        member.roles.remove(femmeRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${femmeRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '⚧': {
        member.roles.remove(intersexeRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${intersexeRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '🎨': {
        member.roles.remove(artisteRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${artisteRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '🎯': {
        member.roles.remove(sportRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${sportRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '🎼': {
        member.roles.remove(musiqueRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${musiqueRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '💻': {
        member.roles.remove(informatiqueRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${informatiqueRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '🎌': {
        member.roles.remove(animeRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${animeRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
      case '🎭': {
        member.roles.remove(otherPassionsRole);
      
        const embed = new MessageEmbed()
        .setTitle(`Rôle supprimé`)
        .setDescription(`Vous avez supprimé le rôle ${otherPassionsRole.name} en réagissant dans ${message.guild.name}`)
        .setColor("#ffef00")
        .setFooter(`Le Dictateur`);

        member.createDM().then(channel => {
          channel.send(embed);
        });
        break;
      }
    };
  };
};