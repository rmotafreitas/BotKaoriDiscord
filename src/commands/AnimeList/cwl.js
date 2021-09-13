const { Client, Message, MessageEmbed } = require("discord.js");
const watchlists = require("../../models/watchlist");

module.exports = {
  name: "cwl",
  aliases: ["add-c"],
  cooldown: 2000,
  category: "AnimeList",
  description: "Create your kaori watch list",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let data = await watchlists.findOne({
      userID: message.author.id,
    });
    if (data)
      return message.inlineReply("You already created an anime watch list!");

    const newWatchList = new watchlists({
      userID: message.author.id,
      nickname: message.author.username,
      watching: [],
      completed: [],
      onHold: [],
      dropped: [],
      toWatch: [],
    });

    newWatchList.save().catch((err) => console.log(err));

    return message.inlineReply("Created! :)");
  },
};
