const prefixs = require("./../models/prefixs");

const getPrefix = async (id) => {
  let guild = await prefixs.findOne({
    guildID: id,
  });
  if (guild) {
    return guild.prefix;
  } else {
    return "$";
  }
};

module.exports = {
  getPrefix,
};
