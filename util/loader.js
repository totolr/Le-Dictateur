const { Console } = require("console");
const { readdirSync } = require("fs");

const loadCommands = (client, dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for ( const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Commande chargé: ${getFileName.help.name}`);
    };
  });
};

const loadEvents = (client, dir = "./events/") => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for ( const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      console.log(`Events chargé: ${evtName}`);
    };
  });
};

const loadDblEvents = (dbl, client, dir = "./dblevents/") => {
  readdirSync(dir).forEach(dirs => {
    const dblevents = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for ( const event of dblevents) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      dbl.webhook.on(evtName, evt.bind(null, client));
      console.log(`DBL events chargé: ${evtName}`);
    };
  });
};

module.exports = {
  loadCommands,
  loadEvents,
  loadDblEvents,
}