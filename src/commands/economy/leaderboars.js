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
  Data.find({
    lb: "all",
  })
    .sort([["money", "descending"]])
    .exec((err, res) => {
      if (err) console.log(err);

      var page = Math.ceil(res.length / 10);

      let embed = new Discord.MessageEmbed();
      embed.setTitle("LEADERBOARD");
      embed.setThumbnail(
        "https://i.pinimg.com/originals/37/f6/e3/37f6e3c43e554757633ae8aff2b4c917.png"
      );
      //name
      let pg = parseInt(args[0]);
      if (pg != Math.floor(pg)) pg = 1;
      if (!pg) pg = 1;
      let end = pg * 10;
      let start = pg * 10 - 10;

      if (res.length === 0) {
        embed.addField("Error", "No pages found!");
      } else if (res.length <= start) {
        embed.addField("Error", "Page not found!");
      } else if (res.length <= end) {
        embed.setFooter(`page ${pg} of ${page}`);

        for (i = start; i < res.length; i++) {
          embed.addField(
            `${i + 1}. ${res[i].name}`,
            `$${res[i].money.toLocaleString()}`
          );
        }
      } else {
        embed.setFooter(`page ${pg} of ${page}`);
        for (i = start; i < end; i++) {
          embed.addField(
            `${i + 1}. ${res[i].name}`,
            `$${res[i].money.toLocaleString()}`
          );
        }
      }

      msg.channel.send(embed);
    });
};

module.exports = {
  name: "lead",
  help: "Show ranking in economy system",
  execute,
};
