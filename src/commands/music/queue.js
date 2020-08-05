const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("No queue!");
  }
  let que = queue.songs;
  let np = queue.songs[0];
  let showQ =
    "```js\n" + `Playing now\n▶️ ${np.title} \n\n 🎵--QUEUE--🎵 \n\n `;
  for (var i = 1; i < que.length; i++) {
    showQ += `${i}) ${queue.songs[i].title}\n`;
  }
  showQ = showQ + "```";
  msg.channel.send(showQ);
};

module.exports = {
  name: "queue",
  help: "Ele mostra a queue!",
  execute,
};
