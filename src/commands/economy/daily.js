const Discord = require("discord.js");

const ms = require("parse-ms");

const { time } = require("console");

const mongoose = require("mongoose");

//CONNECT TO DATABASE
mongoose.connect(process.env.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  let timeout = 86400000;
  let reward = 100;

  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, data) => {
      if (err) console.log(err);
      if (!data) {
        const newData = new Data({
          name: msg.author.username,
          userID: msg.author.id,
          lb: "all",
          money: reward,
          daily: Date.now(),
        });
        newData.save().catch((err) => console.log(err));
        return msg.channel.send(`${msg.author.username} has $${reward}.`);
      } else {
        if (timeout - (Date.now() - data.daily) > 0) {
          let time = ms(timeout - (Date.now() - data.daily));

          return msg.reply(
            `**You already worked today!** Collect again in ${time.hours}h  ${time.minutes}m ${time.seconds}s`
          );
        } else {
          data.money += reward;

          data.daily = Date.now();

          data.save().catch((err) => console.log(err));

          return msg.reply(`You recive $${reward} for your work.`);
        }
      }
    }
  );
};

module.exports = {
  name: "work",
  help: "daily commnad to economy",
  execute,
};
