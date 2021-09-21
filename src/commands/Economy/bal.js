const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const Canvas = require("canvas");
const econmyDB = require("../../tools/classes/economy").economyDB;
const badges = require("../../json/emojis.json");
const path = require("path");

module.exports = {
  name: "account",
  cooldown: 1000,
  aliases: ["bal"],
  category: "Economy",
  usage: "account {@mention}",
  description: "View your economy account",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.startTyping();
    const target =
      message.mentions.users.last() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const profile = new econmyDB(target.id);
    await profile.init();

    const canvas = Canvas.createCanvas(1200, 700);
    const ctx = canvas.getContext("2d");

    //Skin
    var skin = await Canvas.loadImage("https://i.imgur.com/pbOKPwF.png"); //1200x365
    ctx.drawImage(skin, 0, 0, canvas.width, 365);

    //Base
    var background = await Canvas.loadImage(
      path.join(__dirname, "..", "..", "assets", "bal.png")
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Money
    ctx.font = "bold 35px Arial";
    ctx.fillText(`${profile.money}$`, 110, 670);

    //Bio
    ctx.font = "bold 35px Arial";
    ctx.fillText(
      profile.bio != null ? profile.bio : "Too lazy to put a bio",
      110,
      575
    );

    //Username
    ctx.font = "bold 50px Arial";
    ctx.fillText(target.username, 410, 410);

    //Badges
    var badge;
    if (profile.badges.length) {
      for (i = 0; i < profile.badges.length; i++) {
        badge = await Canvas.loadImage(badges[profile.badges[i]].link);
        ctx.drawImage(badge, 410 + 55 * i, 430, 45, 45);
      }
    }

    //Marry
    ctx.font = "bold 33px Arial";
    ctx.fillText("No one", 985, 520);

    //Avatar
    const avatar = await Canvas.loadImage(
      target.displayAvatarURL({ format: "jpg" })
    );
    ctx.beginPath();
    ctx.arc(244.5, 365.5, 149.5, 0, Math.PI * 2, true);
    ctx.lineWidth = 9;
    ctx.strokeStyle = "#FFFCFC";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 95, 216, 299, 299);
    const final = new MessageAttachment(canvas.toBuffer(), "balance.png");
    message.channel.stopTyping();
    message.inlineReply(final);
  },
};
