const mongoose = require("mongoose");

const rpgSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  description: String,
  class: String,
  experience: {
    "type": Number,
    "default": 0
  },
  level: {
    "type": Number,
    "default": 1
  },
  coins: {
    "type": Number,
    "default": 0
  },
  wins: {
    "type": Number,
    "default": 0
  },
  losses: {
    "type": Number,
    "default": 0
  },
  hp: {
    "type": Number,
    "default": 50
  },
  attributs: {
    "type": Object,
    "default": {}
  },
  inventory: [],
  equipments: {
    "type": Object,
    "default":{
      "Mh":"None",
    "Oh":"None",
    "Helmet":"None",
    "Chest":"None",
    "Gloves":"None",
    "Legs":"None",
    "Boots":"None",
    }
  },
  daily: {
    "type": Date,
    "default": 0
  }
}, { minimize: false });

module.exports = mongoose.model("Rpg", rpgSchema);