const Discord = require("discord.js");
const Canvas = require("canvas");
const colors = require("../../colors.json");
const { MessageEmbed } = require("discord.js");
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

        skins = skins.split("+");

        skins = skins[0];

        //? Generate image
        var background = await Canvas.loadImage(skinColors[skins].url);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#C0C0C0";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        //? Letras
        ctx.font = "32px sans-serif";
        ctx.fillStyle = colors.white;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 7;
        ctx.lineWidth = 5;
        ctx.fillText("Kaori Economy", canvas.width / 2.5, canvas.height / 3.5);
        ctx.font = "42px sans-serif";
        ctx.fillStyle = colors.white;
        ctx.shadowBlur = 6;
        ctx.fillText(`${user.tag}`, canvas.width / 2.5, canvas.height / 1.9);
        ctx.font = "33px sans-serif";
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
        skins = data.skin;

        skins = skins.split("+");
        var desc = "**Skins**\n";
        skins.forEach(function (item, index, array) {
          desc = desc + `❯ ${skinColors[skins[index]].emoji} ${skins[index]}\n`;

          // What skins does the user have?
          skinColors[skins[index]].active = true;
        });

        desc += "\n**Waifus**\n";
        if (data.waifus == "") {
          desc += "No waifus\n";
        } else {
          var waifus = data.waifus.substring(1).split("+");
          for (i = 0; i < waifus.length; i++) {
            desc += "**❯** " + waifus[i] + "\n";
          }
        }

        desc += '\n**Rings:** ' + "`" + 'x' + data.rings + " 💍`";

        const embed = new MessageEmbed()
          .setAuthor(
            `${msg.author.username} Account`,
            msg.author.displayAvatarURL({ size: 4096, dynamic: true })
          )
          .setDescription(desc)
          .setColor("#FA5000")
          .setImage("attachment://balance.png")
          .setFooter("ProTip: Use the 'work' command to win money between 12H")
          .attachFiles(final);
        return msg.channel.send(embed);
      }
    }
  );
};

module.exports = {
  name: "bal",
  section: "💸 Economy",
  help: "Show balance of an user in the economy system",
  usage: "bal @mention",
  example: "bal",
  execute,
};
