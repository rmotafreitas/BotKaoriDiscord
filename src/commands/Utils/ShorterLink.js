const { Client, Message, MessageEmbed } = require("discord.js");
const { shorten } = require("isgd");
module.exports = {
  name: "short-link",
  aliases: ["sl"],
  cooldown: 2,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.inlineReply("Please give me a link to i short");

    shorten(query, function (res) {
      message.inlineReply(res);
    });
  },
};
