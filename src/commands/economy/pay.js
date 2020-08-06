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

  Data.findOne;

  if (!args[1]) return msg.reply("Please specify an amount you want to pay.");

  if (!money[msg.author.id])
    return msg.reply("Sorry, you don't have money to pay.");

  if (parseInt(args[1]) > money[msg.author.id].money)
    return msg.reply("You don´t have that much to pay!");

  if (parseInt(args[1]) < 1) return msg.reply("You can't pay less than 1$!");

  if (!money[user.id])
    return msg.reply(
      "Hey, the user u want to pay dosen't have a money account"
    );

  if (!Number.isInteger(parseInt(args[1])))
    return msg.reply("Hey, that's not a number >:(");

  if (user.id === msg.author.id)
    return msg.reply("Hey, u can't pay to yourself");

  money[user.id].money += parseInt(args[1]);
  money[msg.author.id].money -= parseInt(args[1]);
  fs.writeFile(
    "./src/DataBase/economy/money.json",
    JSON.stringify(money),
    (err) => {
      if (err) console.log(err);
    }
  );

  return msg.channel.send(
    `${msg.author.username} payed $${args[1]} to ${
      bot.users.cache.get(user.id).username
    }`
  );
};

module.exports = {
  name: "pay",
  help: "Pay other users, economy system",
  execute,
};
