const { Client, Message, MessageEmbed } = require("discord.js");
const mathjs = require("mathjs");
const colors = require("../../json/colors.json");
const { embed } = require("../../tools/classes/fastEmbed");

module.exports = {
  name: "calc",
  category: "Utils",
  cooldown: 1000,
  description: "Make a math calc.",
  usage: "calc [calc]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let query = args.join(" ");
    query = query.replaceAll("x", "*");
    try {
      message.inlineReply(
        new MessageEmbed()
          .setTitle("Calculator")
          .setTimestamp()
          .setColor("BLUE")
          .addField("Question", query)
          .addField("Solution", mathjs.evaluate(query))
      );
    } catch (err) {
      return message.inlineReply(embed.error("Something wrong was occured!"));
    }
  },
};
