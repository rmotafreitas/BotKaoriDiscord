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
  function name() {
    const mention = msg.author;
    const sayMessage = args.join(" ");
    msg.channel.send(`${sayMessage}\n\n💌 *Message sent by: ${mention}*`);
  }

  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, data) => {
      if (err) console.log(err);
      if (!data) return msg.reply("Hey, create an account first type: $create");
      if (data.say === true) {
        name();
      } else {
        msg.reply("You don't buy this command!");
      }
    }
  );
};

module.exports = {
  name: "say",
  section: "😆 Fun",
  help: "Bot says whatever you want!",
  usage: "say What you want to bot say",
  execute,
};
