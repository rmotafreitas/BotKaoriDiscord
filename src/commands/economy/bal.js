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
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");

        //back

        let skins = data.skin;

        if (skins != "normal") {
          skins = skins.split("+");

          skins = skins[0];
        }

        //? Generate image
        var background = await Canvas.loadImage(skinColors[skins].url);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#C0C0C0";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        //? Letras
        ctx.font = "32px Impact";
        ctx.fillStyle = colors.white;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 7;
        ctx.lineWidth = 5;
        ctx.fillText("Kaori Economy", canvas.width / 2.5, canvas.height / 3.5);
        ctx.font = "42px sans-serif";
        ctx.fillStyle = colors.white;
        ctx.shadowBlur = 6;
        ctx.fillText(`${user.tag}`, canvas.width / 2.5, canvas.height / 1.9);
        ctx.font = "33px Impact";
        ctx.fillStyle = colors.white;
        ctx.shadowBlur = 6;
        ctx.fillText(
          `${data.money} $`,
          canvas.width / 2.45,
          canvas.height / 1.44
        );

        //? Avatar
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#FFFCFC";
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(
          user.displayAvatarURL({ format: "jpg" })
        );

        ctx.drawImage(avatar, 25, 25, 200, 200);

        const final = new Discord.MessageAttachment(
          canvas.toBuffer(),
          "balance.png"
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
