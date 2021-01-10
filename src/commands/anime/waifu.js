const Discord = require("discord.js");
const Data = require("../../models/data.js");
const waifulist = require("public-waifulist");
const { MessageEmbed } = require("discord.js");
const execute = async (bot, msg, args) => {
  let client = new waifulist();
  let waifu = undefined;
  while (waifu == undefined) {
    waifu = await client.getRandom(3000);
  }
  console.log(waifu);
  var author = msg.author;

  const embed = new MessageEmbed()
    .setColor("#BF23FE")
    .setDescription(waifu.data.series.name)
    .setTitle(waifu.data.name)
    .setImage(waifu.data.display_picture)
    .setFooter(
      msg.author.tag,
      msg.author.displayAvatarURL({ size: 4096, dynamic: true })
    )
    .setTimestamp();
  msg.channel.send(embed).then((msg) => {
    msg.react("💍").then((r) => {
      //Making the filter
      const ringFilter = (reaction, user) =>
        reaction.emoji.name === "💍" && user.id === author.id;
      const ring = msg.createReactionCollector(ringFilter, {
        time: 60000,
      });
      ring.on("collect", (r) => {	
        Data.findOne(
          {
            userID: author.id,
          },
          async (err, data) => {
            if (data.rings == 0) return msg.channel.send("You don't have a ring, try buying one at shop");
            data.waifus += "+" + waifu.data.name;
            data.rings -= 1;
            data.save().catch((err) => console.log(err));
            msg.channel.send(`You are now married with ${waifu.data.name}`);
          });
      });
    });
  });
};
module.exports = {
  name: "waifu",
  section: "<:yay:764881220773216297> Anime",
  help: "Shows a waifu",
  usage: "waifu",
  execute,
};
