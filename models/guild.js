const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  prefix: {
    "type": String,
    "default": "ld!"
  },
  logchannel: {
    "type": String,
    "default": ''
  },
  expchannel: {
    "type": String,
    "default": ''
  },
  exp: {
    "type": String,
    "default": 'oui'
  },
  rpg: {
    "type": String,
    "default": 'oui'
  },
  giveaways: {
    "type": String,
    "default": 'non'
  },
  users: []
});

module.exports = mongoose.model("Guild", guildSchema);