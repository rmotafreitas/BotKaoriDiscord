const { Client, Message, MessageEmbed } = require("discord.js");
const { profile } = require("@freezegold/anime.js");
const watchlists = require("../../models/watchlist");
const { accessSync } = require("fs");

module.exports = {
  name: "link-list",
  cooldown: 2,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query)
      return message.inlineReply(
        "Please give me a profile to update your watch list!"
      );
    profile(query, (res, err) => {
      //max = maxResult
      if (err) throw new Error(err);
      console.log(res.anime);
      watchlists.findOne(
        {
          userID: message.author.id,
        },
        (err, data) => {
          if (!data)
            return message.inlineReply(
              "You don't have an account for anime list use `!cwl`"
            );
          data.watching = res.anime.watching;
          data.completed = res.anime.completed;
          data.onHold = res.anime.onHold ? res.anime.onHold : [];
          data.dropped = res.anime.dropped;
          data.toWatch = res.anime.planToWatch;
          data.save().catch((err) => console.log(err));
        }
      );
    });
  },
};
