const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const money = require("../../DataBase/economy/money.json");

const fs = require("fs");

const execute = async (bot, msg, args) => {
  if (!args[0]) {
    var user = msg.author;
  } else {
    var user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
  }

  if (!money[user.id]) {
    return msg.channel.send(
      "You don't have an account, create one! Type: $create "
    );
  } else {
    return msg.channel.send(
      `${bot.users.cache.get(user.id).username} has $${money[user.id].money}`
    );
  }
};

module.exports = {
  name: "bal",
  help: "Ele mostra a conta!",
  execute,
};
