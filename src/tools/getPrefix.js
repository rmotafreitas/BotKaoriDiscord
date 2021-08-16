const prefixs = require("./../models/prefixs");

const getPrefix = async (id) => {
  let guild = await prefixs.findOne({
    guildID: id,
  });
  return guild.prefix;
};

module.exports = {
  getPrefix,
};
