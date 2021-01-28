const Discord = require("discord.js");
var rp = require("request-promise");
const waifulist = require("public-waifulist");
const googleIt = require("google-it");
const { MessageEmbed } = require("discord.js");
const execute = async (bot, msg, args) => {
  //?Get my waifu list link of the character
  /*var link;
  link = await googleIt({
    query: `my waifu list asuna`,
    "only-urls": true,
  })
    .then((results) => {
      console.log(results);
      for (i = 0; i < results.length; i++) {
        if (
          results[i].link.substring(0, 30) == "https://mywaifulist.moe/waifu/"
        ) {
          link = results[i].link;
          return link;
        }
      }
    })
    .catch((e) => {
      // any possible errors that might have occurred (like no Internet connection)
    });
  console.log(link);*/
  //?================================================================

    //!undefined
    if (link == undefined) return msg.reply('Character not found! 404 :(')

  //?Get waifu id
  var page = await rp(link)
    .then(function (htmlString) {
      return htmlString;
    })
    .catch(function (err) {
      // Crawling failed...
    });
  const location = page.search("waifu-id");
  console.log(location);
  var id = "";
  var tryId = page.substring(location + 10, location + 16);
  for (i = 0; i < tryId.length; i++) {
    if (tryId.charAt(i) == '"') break;
    id += tryId.charAt(i);
  }
  console.log(id);
  //?==========================================================

  let client = new waifulist();
  const waifu = await client.getCharacter(id);
  const waifuEmbed = new Discord.MessageEmbed()
    .setColor("#BF23FE")
    .setDescription(`**❯ Name:** ${waifu.data.name}\n`
    + `**❯ Anime:** ${waifu.data.series.name}\n`)
    .setTitle(waifu.data.name)
    .setImage(waifu.data.display_picture)
    .setFooter(
      msg.author.tag,
      msg.author.displayAvatarURL({ size: 4096, dynamic: true })
    )
    .setTimestamp();
  return msg.channel.send(waifuEmbed);
};

module.exports = {
  name: "waifuinfo",
  //section: "<:yay:764881220773216297> Anime",
  help: "Shows a info about a waifu",
  usage: "waifuinfo Kaori Miyazono",
  execute,
};
