const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const Canvas = require("canvas");
const colors = require("../../colors.json");

const execute = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.reply("Tu não tens permissão `BAN_MEMBERS`");
  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.reply("Eu não tenho permissão `BAN_MEMBERS`");

  let userID = "565293138302730260";
  let reason = "Porque é o VALLE!";

  client.users
    .fetch(userID)
    .then(async (user) => {
      await message.guild.members.ban(user.id, { reason: reason });

      const canvas = Canvas.createCanvas(640, 360);
      const ctx = canvas.getContext("2d");
      //? Generate image
      var background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/759538296501698570/857984966046908416/unknown.png"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#C0C0C0";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      //? Avatar

      ctx.beginPath();
      ctx.arc(220, 90, 80, 0, Math.PI * 2, true);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#36393F";
      ctx.stroke();
      ctx.closePath();
      ctx.clip();

      const avatar = await Canvas.loadImage(
        message.author.displayAvatarURL({ format: "jpg" })
      );

      ctx.drawImage(avatar, 140, 10, 160, 160);

      ctx.restore();

      ctx.beginPath();
      ctx.arc(480, 200, 80, 0, Math.PI * 2, true);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#36393F";
      ctx.stroke();
      ctx.closePath();
      ctx.clip();

      const avatar2 = await Canvas.loadImage(
        user.displayAvatarURL({ format: "jpg" })
      );

      ctx.drawImage(avatar2, 400, 120, 160, 160);

      const vbanIMG = new MessageAttachment(canvas.toBuffer(), "vban.png");
      const bannedEmbed = new MessageEmbed()
        .setColor("RED")
        .setImage("attachment://vban.jpg")
        .attachFiles(vbanIMG)
        .setDescription(`<@${user.id}> VALLE Foi Banido ${message.author}`);
      message.channel.send(bannedEmbed);
    })
    .catch((err) => {
      console.log(`There has been an error: **${err}**`);
    });
};

module.exports = {
  name: "vban",
  execute,
};
