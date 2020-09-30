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
  if (msg.author.id != "513113161126248469")
    return msg.reply("Hey your are not my Dev! ");

  let user = msg.mentions.members.first() || bot.users.cache.get(args[0]);

  if (!user) return msg.reply("Sorry, could't find that user.");

  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, authorData) => {
      if (err) console.log(err);
      if (!authorData) {
        msg.reply("Hey, create an account first type: $create");
      } else {
        Data.findOne(
          {
            userID: user.id,
          },
          (err, userData) => {
            if (err) console.log(err);

            if (!args[1])
              return msg.reply("Please specify an amount you want to pay.");

            if (!Number.isInteger(parseInt(args[1])))
              return msg.reply("Hey, that's not a number >:(");

            if (!userData) {
              const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: parseInt(args[1]),
                daily: 0,
              });
              newData.save().catch((err) => console.log(err));
              authorData.save().catch((err) => console.log(err));
            } else {
              userData.money += parseInt(args[1]);
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
  name: "adminpay",
  help: "help",
  execute,
};
