const Discord = require("discord.js");

const money = require("../../DataBase/economy/money.json");

const fs = require("fs");

const execute = async (bot, msg, args) => {
  var user = msg.author;
  if (!money[user.id]) {
    money[user.id] = {
      name: bot.users.cache.get(user.id).tag,
      money: 0,
    };
    fs.writeFile(
      "./src/DataBase/economy/money.json",
      JSON.stringify(money),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    return msg.reply("Created! :)");
  } else {
    return msg.reply("You already have one! :(");
  }
};

module.exports = {
  name: "create",
  help: "Create an account for economy!",
  execute,
};
