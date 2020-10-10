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
  var skinColors = JSON.parse(JSON.stringify(require("../../skins.json")));
  var user = msg.author;

  var id = user.id;

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

        var desc = "";
        if (skins != "normal") {
          skins = skins.split("+");

          skins.forEach(function (item, index, array) {
            desc = desc + `❯ ${skinColors[skins[index]].emoji} ${skins[index]}\n`;

            // What skins does the user have?
            skinColors[skins[index]].active = true;
          });
        } else {
          desc = "❯ ⚫ normal";
        }

        let embed = new MessageEmbed()
          .setTitle("Account settings")
          .setColor("RANDOM")
          .setThumbnail(
            "https://www.gstatic.com/images/branding/product/1x/admin_512dp.png"
          )
          .setDescription(`**Chose your skin: **\n${desc}`);
        
        msg.channel.send(embed).then((msg) => {
          msg.react("⚫").then((r) => {
            for (let [key, value] of Object.entries(skinColors)) {
              if (value.active === true) {
                msg.react(value.emoji);
              }
            }
            
              try {
                function changeSkin(newColor) {
                  let i = skins.findIndex((v) => v === newColor);
                  skins[i] = skins[0];
                  skins[0] = newColor;
                  data.skin = skins.join("+");
                  data.save().catch((err) => console.log(err));
                  msg.channel.send(`${user} Done!`).then((msg) => msg.delete({ timeout: 3500 }));
                }

                for (let [key, value] of Object.entries(skinColors)) {
                  const filter = (reaction, user) =>
                    reaction.emoji.name === value.emoji && user.id === id;
                  const toCollect = msg.createReactionCollector(filter, {
                    time: 60000,
                  });

                  toCollect.on("collect", (r) => {
                    changeSkin(key);
                  });
                }
              } catch (e) {
                console.log(e);
              }
            
          });
        });
      }
    }
  );
};

module.exports = {
  name: "account",
  help: "Account settings on economy system :)",
  execute,
};
