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
  section: "🎵 Music",
  help: "Stop the music",
  usage: "stop",
  example: "stop",
  aliases: ['stp'],
  execute,
};
