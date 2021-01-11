const { MessageEmbed } = require("discord.js");

const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  var user = msg.author;
  id = msg.author.id;
  var skinColors = JSON.parse(JSON.stringify(require("../../skins.json")));
  Data.findOne(
    {
      userID: user.id,
    },
    async (err, data) => {
      if (err) console.log(err);
      if (!data) {
        msg.reply("Hey, You don't have an account, type: $create ");
      } else {
        let skins = data.skin;
        if (skins != "normal") {
          skins = skins.split("+");
          skins.forEach(function (item, index, array) {
            skinColors[skins[index]].active = true;
          });
        }

        let desc = ["**BALANCE SKINS**"];

        for (const key in skinColors) {
          if (!skinColors[key].active) {
            desc.push(
              " ❯ " +
                skinColors[key].emoji +
                " " +
                key +
                " - " +
                skinColors[key].price +
                "$"
            );
          }
        }

        desc.push("**COMMANDS**");
        desc.push(" ❯ 📣 $say - 15000$");
        desc.push("**OTHERS**");
        desc.push(" ❯ 💍 Ring - 1250$");

        let embed = new MessageEmbed()
          .setTitle("Shop")
          .setColor("RANDOM")
          .setImage(
            "https://i.pinimg.com/originals/96/2f/f6/962ff6c2e535eebc9d762cf420b631c8.gif"
          )
          .setFooter("To view an item use the command: buy NameOfTheItem | and if you have money and like it you can buy it!")
          .setDescription(desc);

          
          msg.channel.send(embed);
      }
    }
  );
};

module.exports = {
  name: "shop",
  section: "💸 Economy",
  help: "Shop system economy!",
  usage: "shop",
  execute,
};
