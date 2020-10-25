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
  var user = msg.author;
  //return msg.reply("NOW WORKING RN");
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
            desc.push(" ❯ " + skinColors[key].emoji + " " + key + " - " + skinColors[key].price + "$");
          }
        }

        desc.push("**COMMANDS**");
        desc.push(" ❯ 📣 $say - 3500$");

        let embed = new MessageEmbed()
          .setTitle("Shop")
          .setColor("RANDOM")
          .setImage(
            "https://i.pinimg.com/originals/96/2f/f6/962ff6c2e535eebc9d762cf420b631c8.gif"
          )
          .setFooter("Jsut click on the reactions!")
          .setDescription(desc);

        msg.channel.send(embed).then((msg) => {
          msg.react("📣").then((r) => {
            for (let [key, value] of Object.entries(skinColors)) {
              if (value.active === false) {
                msg.react(value.emoji);
              }
            }

            try {
              function buySkin(newColor) {
                if (data.money <= 0)
                  return msg.channel.send("You Don´t have money"); //

                if (data.money < skinColors[newColor].price) {
                  return msg.channel.send("You Don't have that much to pay"); //
                }

              if (data.skin != "normal") {
                let foundIndex = skins.findIndex((v) => v === newColor);
                if (foundIndex > 0) {
                  return msg.channel.send("You already have purchased this!");
                }
              }

                embed.setImage(skinColors[newColor].url)
                embed.setFooter("Are you sure that you want to buy this? Type yes or no !")
                msg.edit(embed);

                const filter = (m) => m.author.id === id;

                msg.channel
                  .awaitMessages(filter, {
                    max: 1, // leave this the same
                    time: 10000, // time in MS. there are 1000 MS in a second
                  })
                 .then(async (collected) => {
                    if (collected.first().content == "yes") {
                      data.skin = data.skin + "+" + newColor;
                      data.money -= skinColors[newColor].price;
                      data.save().catch((err) => console.log(err));
                      msg.channel.send(`${user}, Purchased, ${newColor} !`).then((msg) => msg.delete({ timeout: 3500 }));
  
                      embed.setImage(
                        "https://i.pinimg.com/originals/96/2f/f6/962ff6c2e535eebc9d762cf420b631c8.gif"
                      )
                      embed.setFooter("Jsut click on the reactions!")
                      msg.edit(embed);  
                    } else {
                      msg.channel.send(`${user} Ok :(`).then((msg) => msg.delete({ timeout: 3500 }));
                      embed.setImage(
                        "https://i.pinimg.com/originals/96/2f/f6/962ff6c2e535eebc9d762cf420b631c8.gif"
                      )
                      embed.setFooter("Jsut click on the reactions!")
                      msg.edit(embed);
                    }
                  })
                  .catch((err) => {
                  // what to do if a user takes too long goes here
                    console.log(err);
                    embed.setImage(
                      "https://i.pinimg.com/originals/96/2f/f6/962ff6c2e535eebc9d762cf420b631c8.gif"
                    )
                    embed.setFooter("Jsut click on the reactions!")
                    msg.edit(embed);
                    msg.channel.send(` ${user} You took too long! Goodbye!`).then((msg) => msg.delete({ timeout: 3500 }));

                  });


              }

              for (let [key, value] of Object.entries(skinColors)) {
                const filter = (reaction, user) =>
                  reaction.emoji.name === value.emoji && user.id === id;
                const toCollect = msg.createReactionCollector(filter, {
                  time: 60000,
                });

                toCollect.on("collect", (r) => {
                  buySkin(key);
                });
              }
            } catch (e) {
              console.log(e);
            }

            const sayfilter = (reaction, user) =>
              reaction.emoji.name === "📣" && user.id === id;

            const sayf = msg.createReactionCollector(sayfilter, {
              time: 60000,
            });

            sayf.on("collect", (r) => {
              if (data.say === true) {
                return msg.channel.send("You already have purchased $say !");
              }
              if (data.money <= 0) return msg.reply("You Don´t have money"); //

              if (data.money < 3500)
                return msg.reply("You Don't have that much to pay"); //
              data.money -= 3500;
              data.say = true;
              data.save().catch((err) => console.log(err));
              msg.channel.send("Purchased!");
            });
          });
        });
      }
    }
  );
};

module.exports = {
  name: "shop",
  helpEconomy: "Shop system economy!",
  execute,
};
