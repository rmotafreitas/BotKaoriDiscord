const Discord = require("discord.js");

const mongoose = require("mongoose");

//CONNECT TO DATABASE
mongoose.connect(process.env.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
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
          money: 0,
          daily: 0,
        });
        newData.save().catch((err) => console.log(err));
        return msg.reply(
          "Sorry, you don't have any money to gamble, work first."
        );
      } else {
        if (data.money <= 0) return msg.reply("You don´t have money");

        if (!args[0]) return msg.reply("Please specify a bet.");

        if (!Number.isInteger(parseInt(args[0])))
          return msg.reply("Hey, that's not a whole number >:(");

        var bet = parseInt(args[0]);

        if (data.money < bet)
          return msg.reply("You don't have that much to bet");

        let chances = ["win", "lose"];

        var pick = chances[Math.floor(Math.random() * chances.length)];

        if (pick == "lose") {
          data.money -= bet;
          data.save().catch((err) => console.log(err));
          return msg.reply(`You lost. New balance: $${data.money}`);
        } else {
          data.money += bet;
          data.save().catch((err) => console.log(err));
          return msg.reply(`You win. New balance: $${data.money}`);
        }
      }
    }
  );
};

module.exports = {
  name: "gamble",
  help: "gamble your money, economy system",
  execute,
};
