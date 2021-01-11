const { MessageEmbed } = require("discord.js");

// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  var user = msg.author;
  var id = user.id;
  var skinColors = JSON.parse(JSON.stringify(require("../../skins.json")));
  Data.findOne(
    {
      userID: user.id,
    },
    async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!data) {
        return msg.reply("Hey, create an account first type: $create");
      } else {
        let skins = data.skin;
        if (skins != "normal") {
          skins = skins.split("+");
          skins.forEach(function (item, index, array) {
            skinColors[skins[index]].active = true;
          });
        }
        if (!args[0]) return msg.reply("What do you want to buy?");

        if (args[0] == "say") {
          if (data.say === true) {
            return msg.channel.send("You already have purchased $say !");
          }

          if (data.money < 15000) {
            const embed = new MessageEmbed()
              .setTitle(`Shop`)
              .setColor("#FF5B5B")
              .setDescription(`Buy Say command`)
              .setImage(
                "https://cdn.discordapp.com/attachments/764447928420532224/795389467934326854/unknown.png"
              )
              .setFooter("You Don't have that much to pay")
              .setTimestamp();
            return msg.channel.send(embed);
          }

          const embed = new MessageEmbed()
            .setTitle(`Shop`)
            .setColor("#FF5B5B")
            .setDescription(`Buy Say command`)
            .setImage(
              "https://cdn.discordapp.com/attachments/764447928420532224/795389467934326854/unknown.png"
            )
            .setFooter("Are you sure about that?")
            .setTimestamp();
          return msg.channel.send(embed).then((msg) => {
            //?Adiciona as reações
            //?Yes
            msg.react("✅").then((r) => {
              const yesFilter = (reaction, user) =>
                reaction.emoji.name === "✅" && user.id === id;
              const yes = msg.createReactionCollector(yesFilter, {
                time: 60000,
              });

              //?No
              msg.react("❌");
              const noFilter = (reaction, user) =>
                reaction.emoji.name === "❌" && user.id === id;
              const no = msg.createReactionCollector(noFilter, {
                time: 60000,
              });

              yes.on("collect", (r) => {
                data.money -= 15000;
                data.say = true;
                data.save().catch((err) => console.log(err));
                return msg.channel.send(`${user}, Purchased!`);
              });

              no.on("collect", (r) => {
                return msg.channel.send(`${user}, Ok ;(`);
              });
            });
          });
        }

        if (args[0] == "ring") {
          if (data.money < 1250)
            return msg.reply("You Don't have that much to pay"); //
          const embed = new MessageEmbed()
            .setTitle(`Shop`)
            .setColor("#FF5B5B")
            .setDescription(`Buy a ring? 💍`)
            .setFooter("Are you sure about that?")
            .setTimestamp();
          return msg.channel.send(embed).then((msg) => {
            //?Adiciona as reações
            //?Yes
            msg.react("✅").then((r) => {
              const yesFilter = (reaction, user) =>
                reaction.emoji.name === "✅" && user.id === id;
              const yes = msg.createReactionCollector(yesFilter, {
                time: 60000,
              });

              //?No
              msg.react("❌");
              const noFilter = (reaction, user) =>
                reaction.emoji.name === "❌" && user.id === id;
              const no = msg.createReactionCollector(noFilter, {
                time: 60000,
              });

              yes.on("collect", (r) => {
                data.money -= 1250;
                data.rings += 1;
                data.save().catch((err) => console.log(err));
                return msg.channel.send(`${user}, Purchased!`);
              });

              no.on("collect", (r) => {
                return msg.channel.send(`${user}, Ok ;(`);
              });
            });
          });
        }

        var isIn = false;
        if (skins.includes(args[0]))
          return msg.reply("You already have this item");
        for (const key in skinColors) {
          if (skinColors[key].name == args[0]) {
            isIn = true;
            buySkin(key);
            break;
          }
        }
        if (!isIn) return msg.reply("That item not found");

        function buySkin(newColor) {
          if (data.money < skinColors[newColor].price) {
            const embed = new MessageEmbed()
              .setTitle(`Shop`)
              .setColor("#FF5B5B")
              .setDescription(`Buy Skin: ${skinColors[newColor].name}`)
              .setImage(skinColors[newColor].url)
              .setFooter("You don't have that much to pay.")
              .setTimestamp();
            return msg.channel.send(embed);
          }
          const embed = new MessageEmbed()
            .setTitle(`Shop`)
            .setColor("#FF5B5B")
            .setDescription(`Buy Skin: ${skinColors[newColor].emoji} ${skinColors[newColor].name}`)
            .setImage(skinColors[newColor].url)
            .setFooter("Are you sure about that?")
            .setTimestamp();
          msg.channel.send(embed).then((msg) => {
            //?Adiciona as reações
            //?Yes
            msg.react("✅").then((r) => {
              const yesFilter = (reaction, user) =>
                reaction.emoji.name === "✅" && user.id === id;
              const yes = msg.createReactionCollector(yesFilter, {
                time: 60000,
              });

              //?No
              msg.react("❌");
              const noFilter = (reaction, user) =>
                reaction.emoji.name === "❌" && user.id === id;
              const no = msg.createReactionCollector(noFilter, {
                time: 60000,
              });

              yes.on("collect", (r) => {
                data.skin = data.skin + "+" + newColor;
                data.money -= skinColors[newColor].price;
                data.save().catch((err) => console.log(err));
                return msg.channel.send(`${user}, Purchased!`);
              });

              no.on("collect", (r) => {
                return msg.channel.send(`${user}, Ok ;(`);
              });
            });
          });
        }
      }
    }
  );
};

module.exports = {
  name: "buy",
  section: "💸 Economy",
  help: "To view an item use the command: buy NameOfTheItem | and if you have money and like it you can buy it!",
  usage: "buy NameOfTheItem",
  execute,
};
