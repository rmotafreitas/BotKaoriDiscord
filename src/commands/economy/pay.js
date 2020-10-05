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
  let user = msg.mentions.members.first() || bot.users.cache.get(args[0]);

  if (!user) return msg.reply("Sorry, could't find that user.");

  if (user.id === msg.author.id)
    return msg.reply("Hey, u can't pay to yourself");

  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, authorData) => {
      if (err) console.log(err);
      if (!authorData) {
        msg.reply("Hey, create an account first type: $create");
      } else {
        if (authorData.money == -1) return msg.reply("You are blocked!");
        Data.findOne(
          {
            userID: user.id,
          },
          (err, userData) => {
            if (!userData)
              return msg.reply("That user dosen't have an account!");
            if (err) console.log(err);
            if (userData.money == -1)
              return msg.reply("Hey this account is Blocked!");
            if (!args[1])
              return msg.reply("Please specify an amount you want to pay.");

            if (!Number.isInteger(parseInt(args[1])))
              return msg.reply("Hey, that's not a number >:(");

            if (parseInt(args[1]) > authorData.money)
              return msg.reply("You don´t have that much to pay!");

            if (parseInt(args[1]) < 1)
              return msg.reply("You can't pay less than 1$!");

            if (!userData) {
              const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: parseInt(args[1]),
                daily: 0,
              });
              authorData.money -= parseInt(args[1]);
              newData.save().catch((err) => console.log(err));
              authorData.save().catch((err) => console.log(err));
            } else {
              userData.money += parseInt(args[1]);
              authorData.money -= parseInt(args[1]);
              userData.save().catch((err) => console.log(err));
              authorData.save().catch((err) => console.log(err));
            }
            return msg.channel.send(
              `${msg.author.username} payed $${args[1]} to ${
                bot.users.cache.get(user.id).username
              }`
            );
          }
        );
      }
    }
  );
};

module.exports = {
  name: "pay",
  help: "Pay other users, economy system",
  execute,
};
