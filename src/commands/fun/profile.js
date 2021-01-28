const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const Canvas = require("canvas");
const colors = require("../../colors.json");
const execute = async (bot, msg, args) => {
  const member =
    msg.mentions.members.first() ||
    msg.guild.members.cache.get(args[0]) ||
    msg.member;
  var exp;
  var lvl;
  database
    .ref(`Servidores/Levels/${msg.guild.id}/Config`)
    .once("value")
    .then(async function (db) {
      if (db.val().systemXp == "off") {
        return msg.reply("The Xp system in this server is turned Off!");
      } else {
        database
          .ref(`Servidores/Levels/${msg.guild.id}/${member.user.id}`)
          .once("value")
          .then(async function (db) {
            if (db.val() == null) {
              database
                .ref(`Servidores/Levels/${msg.guild.id}/${member.user.id}`)
                .set({
                  lb: "all",
                  xp: 0,
                  level: 1,
                });
              exp = 0;
              lvl = 1;
            } else {
              exp = db.val().xp;
              lvl = db.val().level;
            }
            //?console.log(exp, lvl);
            const canvas = Canvas.createCanvas(1000, 333);
            const ctx = canvas.getContext("2d");
            const background = await Canvas.loadImage(
              "https://i.imgur.com/YiKsCrw.jpeg"
            );
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.stroke.style = colors.white;
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000";
            ctx.fillRect(180, 216, 770, 65);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeRect(180, 216, 770, 65);
            ctx.stroke();

            //bar
            ctx.fillStyle = "#83FFDF";
            ctx.globalAlpha = 0.6;
            ctx.fillRect(180, 216, (100 / (lvl * 100)) * exp * 7.7, 65);
            ctx.fill();
            ctx.globalAlpha = 1;

            //text
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = colors.white;
            ctx.fillText(`${exp} / ${lvl * 100} XP`, 600, 260);

            //user tag
            ctx.textAlign = "left";
            ctx.fillText(member.user.tag, 300, 120);

            //lvl
            ctx.font = "50px Arial";
            ctx.fillText("Level:", 300, 180);
            ctx.fillText(lvl, 470, 180);

            //avatar
            ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
            ctx.lineWidth = 6;
            ctx.strokeStyle = colors.white;
            ctx.stroke();
            ctx.closePath();
            ctx.clip();
            const avatar = await Canvas.loadImage(
              member.user.displayAvatarURL({ format: "jpg" })
            );
            ctx.drawImage(avatar, 40, 40, 250, 250);

            //
            const profileXp = new Discord.MessageAttachment(
              canvas.toBuffer(),
              "profile.png"
            );

            return msg.channel.send(profileXp);
          });
      }
    });
};

module.exports = {
  name: "rank",
  section: "😆 Fun",
  help: "Shows mentioned Xp Level Card or yours, if the system is On",
  usage: "rank <@mention>",
  example: "rank",
  execute,
};
