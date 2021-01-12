const { MessageEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports.run = async (client, message, args) => {

    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) message.channel.send(err)

        if(result.length === 0) {
            message.channel.send("**veuillez entrer un emplacement valide**")
            return;
        }

        var current = result[0].current 
        var location = result[0].location

        let embed = new MessageEmbed()
           .setDescription(`**${current.skytext}**`) 
           .setAuthor(`Météo pour ${current.observationpoint}`) 
           .setThumbnail(current.imageUrl) 
           .setColor(0x00AE86) 
           .addField("Fuseau horaire", `UTC${location.timezone}`, true) 
           .addField("Type de degré", location.degreetype, true) 
           .addField("Température", `${current.temperature}`, true)
           .addField("Ressenti", `${current.feelslike} Degrees`, true)
           .addField("Vents", current.winddisplay, true)
           .addField("Humidité", ` ${current.humidity}%`, true)
           .addField("Jour", `${current.day}`, true)
           .addField("Date", `${current.date}`, true)
           
           message.channel.send(embed);

    });

message.delete();
    
}

module.exports.help = {
  name: "meteo",
  aliases: ['meteo', 'weather'],
  category: 'utile',
  displayName: '📁 Utile',
  description: "Renvoie la météo d'un lieu dit",
  cooldown: 1,
  usage: '<ville>',
  isUserAdmin: false,
  permissions: false,
  args: true,
  logchannel: false,
  exp: false,
  rpg: false
};