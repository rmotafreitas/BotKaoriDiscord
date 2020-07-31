const Discord = require("discord.js");
const execute = async (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("Não hà música tocando!");
  }
  queue.dispatcher.pause();
  msg.reply("Pause!").then((sentMsg) => {
    sentMsg.react("⏸️");
  });
};

module.exports = {
  name: "pause",
  help: "Ele pausa a música",
  execute,
};
