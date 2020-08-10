const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const mongoose = require("mongoose");

//CONNECT TO DATABASE
mongoose.connect(process.env.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  return msg.reply("NOW WORKING RN");

  id = msg.author.id;

  let desc = [
    "**BALANCE SKINS**",
    "❯ Gold - 10000$",
    "❯ Silver - 5000$",
    "❯ Bronze - 3000$",
    "**COMMANDS**",
    "❯ $say - 3500$",
  ];

  let embed = new MessageEmbed()
    .setTitle("Shop")
    .setColor("RANDOM")
    .setThumbnail(
      "https://i.pinimg.com/originals/96/2f/f6/962ff6c2e535eebc9d762cf420b631c8.gif"
    )
    .setDescription(desc);
  msg.channel.send(embed).then((msg) => {
    msg.react("🟡").then((r) => {
      msg.react("⚪");
      msg.react("🟤");
      msg.react("📣");
      //filtros
      const goldfilter = (reaction, user) =>
        reaction.emoji.name === "🟡" && user.id === id;
      const silverfilter = (reaction, user) =>
        reaction.emoji.name === "⚪" && user.id === id;
      const brozefilter = (reaction, user) =>
        reaction.emoji.name === "🟤" && user.id === id;
      const sayfilter = (reaction, user) =>
        reaction.emoji.name === "📣" && user.id === id;

      const goldf = msg.createReactionCollector(goldfilter, {
        time: 60000,
      });
      const silverf = msg.createReactionCollector(silverfilter, {
        time: 60000,
      });
      const bronzef = msg.createReactionCollector(brozefilter, {
        time: 60000,
      });
      const sayf = msg.createReactionCollector(sayfilter, {
        time: 60000,
      });

      flag = false;

      goldf.on("collect", (r) => {
        if (!flag) {
          flag = true;
          Data.findOne(
            {
              userID: id,
            },
            (err, data) => {
              if (err) console.log(err);
              if (!data) {
                msg.reply("Hey, create an account first type: $create"); //
              } else {
                if (data.money <= 0) return msg.reply("You Don´t have money"); //

                if (data.money < 10000)
                  return msg.reply("You Don't have that much to pay"); //
                data.skin = "gold";
                data.save().catch((err) => console.log(err));
              }
            }
          );
        }
      });

      silverf.on("collect", (r) => {
        if (!flag) {
          flag = true;
        }
      });

      bronzef.on("collect", (r) => {
        if (!flag) {
          flag = true;
        }
      });

      sayf.on("collect", (r) => {
        if (!flag) {
          flag = true;
        }
      });
    });
  });
};

module.exports = {
  name: "shop",
  help: "Shop system economy!",
  execute,
};
