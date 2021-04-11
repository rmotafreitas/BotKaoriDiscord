const Discord = require("discord.js");

const getUsers = async (bot) => {
    let users = 0;
    guilds = bot.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .first(bot.guilds.cache.size);
    for (const gen of guilds) {
      if (gen.memberCount) users += gen.memberCount;
    }
    return users;
};

module.exports = {
  getUsers,
};
