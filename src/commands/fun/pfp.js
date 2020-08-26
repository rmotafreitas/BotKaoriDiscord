const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const cheerio = require("cheerio"); /* Used to extract html content, based on jQuery || install with npm install cheerio */
const request = require("request"); /* Used to make requests to URLs and fetch response  || install with npm install request */
const colors = require("../../colors.json");

const execute = async (bot, msg, args) => {
  /* extract search query from message */

  var search = msg.content.slice(process.env.PREFIX.length).split(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"

  var teste = search[1];
  if (!search[2]) {
    teste = search[1];
  } else {
    search.forEach(function (item, index, array) {
      if (index > 1) {
        teste += "+" + search[index];
      }
    });
  }

  var options = {
    url: "http://results.dogpile.com/serp?qc=images&q=" + teste,
    method: "GET",
    headers: {
      Accept: "text/html",
      "User-Agent": "Chrome",
    },
  };
  request(options, function (error, response, responseBody) {
    if (error) {
      // handle error
      return;
    }

    /* Extract image URLs from responseBody using cheerio */

    $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

    // In this search engine they use ".image a.link" as their css selector for image links
    var links = $(".image a.link");

    // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
    // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
    var urls = new Array(links.length)
      .fill(0)
      .map((v, i) => links.eq(i).attr("href"));

    if (!urls.length) return;
    var img = urls[Math.floor(Math.random() * urls.length)];
    let Embed = new MessageEmbed()
      .setImage(img)
      .setTitle("Download image")
      .setColor(colors.white)
      .setURL(img);
    msg.channel.send(Embed);
  });
};

module.exports = {
  name: "pic",
  help: "Get a pfp form a request",
  execute,
};
