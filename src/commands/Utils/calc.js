const { Client, Message, MessageEmbed } = require("discord.js");
const mathjs = require("mathjs");
const colors = require("../../json/colors.json");
const replaceAll = require("../../tools/replaceAll.js").replaceAll;

module.exports = {
  name: "calc",
  cooldown: 1,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let query = args.join(" ");
    query = await replaceAll(query, "x", "*");
    try {
      message.inlineReply(
        new MessageEmbed()
          .setTitle("Calculator")
          .setTimestamp()
          .setColor(colors.cream)
          .addField("Question", query)
          .addField("Solution", mathjs.evaluate(query))
      );
    } catch (err) {}
  },
};
