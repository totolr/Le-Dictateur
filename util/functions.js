const mongoose = require("mongoose");
const config = require("../config");
const { Guild, Rpg } = require("../models/index");

module.exports = (client) => {
  client.createGuild = async (guild) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save();
  };

  client.getGuild = async (guild) => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
  };

  client.getUser = async (member) => {
    const data = await client.getGuild(member.guild);
    const position = data.users.map((e) => e.id).indexOf(member.id);
    return data.users[position];
  };

  client.getUsers = async (member) => {
    const data = await client.getGuild(member.guild);
    return data.users;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.deleteGuild = (guild) => {
    Guild.deleteOne({ guildID: guild.id }).then();
  };

  client.createUserProfile = (member, guild) => {
    Guild.updateOne(
      { guildID: guild.id },
      {
        $push: {
          users: {
            id: member.id,
            experience: 0,
            level: 1,
          },
        },
      }
    ).then((d) => console.log(`${member.user.tag} a rejoint ${guild.name}`));
  };

  client.updateUserInfo = (guild, member, options = {}) => {
    Guild.updateOne({ guildID: guild.id, "users.id": member.id }, { $set: options }).then();
  };

  client.createMissingInfoOnUser = (member, missingInfo = {}) => {
    Guild.updateOne({ "users.id": member.id }, { $set: missingInfo }).then();
  };

  client.addExp = async (client, member, exp, guild) => {
    const userToUpdate = await client.getUser(member);
    const updatedExp = userToUpdate.experience + exp;
    await client.updateUserInfo(guild, member, {
      "users.$.experience": updatedExp
    });
  };

  client.createRpg= async (rpg) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, rpg);
    const createRpg = await new Rpg(merged);
    createRpg.save();
  };

  client.getRpg = async (rpg) => {
    const data = await Rpg.findOne({ userID: rpg.id });
    if (data) return data;
    return config.DEFAULTRPG;
  };

  client.updateRpg = async (rpg, settings) => {
    let data = await client.getRpg(rpg);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.getExperience = (level, experience) => {
    let expTotalLevel = 0;
    for (let i = 0; i < level; i++) {
      let expLevel = Math.pow(i, 2) * 10;
      expTotalLevel += expLevel
      if (i == level - 1) {
        const expTotal = expTotalLevel + experience;
        return expTotal;
      }
    }
  }

  client.getExperienceRpg = (level, experience) => {
    let expTotalLevel = 0;
    for (let i = 0; i < level; i++) {
      let expLevel = i * 30;
      expTotalLevel += expLevel
      if (i == level - 1) {
        const expTotal = expTotalLevel + experience;
        return expTotal;
      }
    }
  }
};
 