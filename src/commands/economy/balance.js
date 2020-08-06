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
  if (!args[0]) {
    var user = msg.author;
  } else {
    var user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
  }

  Data.findOne(
    {
      userID: user.id,
    },
    (err, data) => {
      if (err) console.log(err);
      if (!data) {
        const newData = new Data({
          name: bot.users.cache.get(user.id).username,
          userID: user.id,
          lb: "all",
          money: 0,
          daily: 0,
        });
        newData.save().catch((err) => console.log(err));
        return msg.channel.send(
          `${bot.users.cache.get(user.id).username} has $0.`
        );
      } else {
        return msg.channel.send(
          `${bot.users.cache.get(user.id).username} has $${data.money}.`
        );
      }
    }
  );
};

module.exports = {
  name: "bal",
  help: "Ele mostra a conta!",
  execute,
};
