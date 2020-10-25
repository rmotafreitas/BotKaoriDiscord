//"https://i.imgur.com/S8JDywj.jpg"
const Discord = require("discord.js");
const Canvas = require("canvas");
const colors = require("../../colors.json");
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
  if (!args[0]) {
    var user = msg.author;
  } else {
    var user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
  }

  Data.findOne(
    {
      userID: user.id,
    },
    async (err, data) => {
      if (err) console.log(err);
      if (!data) {
        msg.reply("Hey, You don't have an account, type: $create ");
      } else {
        if (data.money == -1) return msg.reply("Hey this account is Blocked!");
        const canvas = Canvas.createCanvas(500, 200);
        const ctx = canvas.getContext("2d");

        //back

        let skins = data.skin;
        
        if (skins != "normal") {
          skins = skins.split("+");
          
          skins = skins[0];
        }

        var background = await Canvas.loadImage(skinColors[skins].url);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = colors.white;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colors.white;
        var size1 = 40;
        var size2 = 30;

        var name = user.tag;
        do {
          ctx.font = `${(size1 -= 5)}px sans-serif`;
        } while (ctx.measureText(name).width > canvas.width - 225);

        ctx.fillText(name, 200, 65);
        var balance = "Balance: $" + data.money;
        do {
          ctx.font = `${(size2 -= 5)}px sans-serif`;
        } while (ctx.measureText(balance).width > canvas.width - 225);
        ctx.fillText(balance, 200, 110);

        ctx.beginPath();

        ctx.arc(100, 100, 75, 0, Math.PI * 2, true);

        ctx.closePath();

        ctx.clip();

        const avatar = await Canvas.loadImage(
          user.displayAvatarURL({ format: "jpg" })
        );

        ctx.drawImage(avatar, 25, 25, 150, 150);

        const final = new Discord.MessageAttachment(
          canvas.toBuffer(),
          "bal.png"
        );

        return msg.channel.send(final);
      }
    }
  );
};

module.exports = {
  name: "bal",
  helpEconomy: "Show balance of an user, economy",
  execute,
};
