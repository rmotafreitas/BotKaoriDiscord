const { Client, Message, MessageEmbed } = require("discord.js");
const watchlists = require("../../models/watchlist");
const { searchAnime } = require("@freezegold/anime.js");
const colors = require("../../json/colors.json");

module.exports = {
  name: "add-dropped",
  aliases: ["add-d"],
  cooldown: 2000,
  category : 'AnimeList',
  description : 'Add a dropped anime to your kaori watch list',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.inlineReply("Please give me an anime to add!");
    let data = await watchlists.findOne({
      userID: message.author.id,
    });

    const anime = await searchAnime(query, 1).then((res) => {
      return res[0];
    });

    if (!anime) return message.inlineReply("I don't know that anime!");

    const animeName = anime.titles.english
      ? anime.titles.english
      : anime.titles.romaji
      ? anime.titles.romaji
      : anime.titles.japanese;

    if (data.watching.includes(animeName)) {
      const index = data.watching.indexOf(animeName);
      data.watching.splice(index, 1); 
    }

    if (data.completed.includes(animeName)) {
      const index = data.completed.indexOf(animeName);
      data.completed.splice(index, 1);
    }

    if (data.onHold.includes(animeName)) {
      const index = data.onHold.indexOf(animeName);
      data.onHold.splice(index, 1);
    }

    if (data.dropped.includes(animeName)) {
      const index = data.dropped.indexOf(animeName);
      data.dropped.splice(index, 1);
    }

    if (data.toWatch.includes(animeName)) {
      const index = data.dropped.indexOf(animeName);
      data.dropped.splice(index, 1);
    }

    data.dropped.unshift(animeName);

    data.save();

    return message.inlineReply(`Added: ${animeName}`);
  },
};
