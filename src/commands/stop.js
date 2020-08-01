const Discord = require("discord.js");
const execute = async (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("There is no music playing!");
  }

  queue.songs = [];
  bot.queues.set(msg.guild.id, queue);
  queue.dispatcher.end();
};

module.exports = {
  name: "stop",
  help: "Ele para de tocar tudo",
  execute,
};
