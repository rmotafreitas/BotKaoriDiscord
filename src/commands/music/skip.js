const playSong = require("./play").playSong;

const execute = async (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("There is no music playing!");
  }
  queue.songs.shift();
  bot.queues.set(msg.guild.id, queue);
  playSong(bot, msg, queue.songs[0]);
};

module.exports = {
  name: "skip",
  helpMusic: "Skip to the next track",
  execute,
};
