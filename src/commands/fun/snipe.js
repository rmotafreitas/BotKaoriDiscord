const Discord = require("discord.js");

const execute = async (bot, message, args) => {
  function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  var i = 0;
  var desc = "";

  const embed = new Discord.MessageEmbed().setColor("BLUE");

  bot.snipes.reverse().forEach((msg) => {
    if (msg.channel.id != message.channel.id) return;
    if (i >= 1) return;
    var endDate = new Date();
    var time = (endDate.getTime() - msg.date.getTime()) / 1000;
    embed.setAuthor(
      msg.author.username,
      msg.author.displayAvatarURL({ dynamic: false, size: 1024 })
    );
    embed.setImage(msg.image);
    desc = `${msg.content}`;
    embed.setFooter(
      `${secondsToDhms(time)} ago`,
      "https://cdn.icon-icons.com/icons2/1918/PNG/512/iconfinder-document10-1622826_121954.png"
    );
    i++;
  });

  if (i == 0) {
    embed.setTitle(`There is nothing to snipe!`);
  } else {
    embed.setDescription(desc);
  }

  return message.channel.send(embed);
};

module.exports = {
  name: "snipe",
  section: "😆 Fun",
  help: "Sbnipes last message!",
  usage: "snipe",
  example: "snipe",
  execute,
};
