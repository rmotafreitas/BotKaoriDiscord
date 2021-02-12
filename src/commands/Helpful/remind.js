const Discord = require("discord.js");
const getHelp = require("../../tools/helpDoubt.js").helpDoubt;
const ms = require('ms');
const execute = async (bot, msg, args) => {
  const time = args[0];
  if (!time) {
      msg.reply('You need me to tell how much time you want to me remind you: 10m 10s 10d')
      getHelp(msg, bot, "remind");
      return;
  }

  const remider = args.join(' ').slice(args[0].length);

  if (remider) {
      msg.reply(`Reminder set, I will remind you in ${time}`)

      setTimeout(function() {
        msg.member.send(`*Your ${time} reminder:* ${remider}`)
      }, ms(time))
  } else {
    msg.reply('You forgot to say what do you want to me remind you')
    getHelp(msg, bot, "remind");
    return;
  }

};

module.exports = {
  name: "remind",
  help: "Remind you in time!",
  section: "⚙️ HelpFul",
  usage: "remind [time (s/m/d)] [thing that you want to remember]",
  example: "remind 5m wash hands",
  aliases: ['rmd'],
  execute,
};