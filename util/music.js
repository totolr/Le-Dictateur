exports.canModifyQueue = (member) => {
  const { channelID } = member.voice;
  const botChannel = member.guild.voice.channelID;

  if (channelID !== botChannel) {
    member.send("Vous devez d'abord rejoindre le canal vocal!").catch(console.error);
    return;
  }

  return true;
};

let config = require("../config");

exports.YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
exports.SOUNDCLOUD_CLIENT_ID = config.SOUNDCLOUD_CLIENT_ID;
exports.MAX_PLAYLIST_SIZE = config.MAX_PLAYLIST_SIZE;
exports.PRUNING = config.PRUNING;
exports.STAY_TIME = config.STAY_TIME;
exports.DEFAULT_VOLUME = config.DEFAULT_VOLUME;