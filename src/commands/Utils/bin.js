const { Client, Message, MessageEmbed } = require("discord.js");
const { create } = require("sourcebin");

module.exports = {
  name: "create-bin",
  cooldown: 2,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const content = args.join(" ");
    if (!content) return message.inlineReply("Please give some text / file");

    create(
      [
        {
          name: "random code",
          content,
          language: "javascript",
        },
      ],
      {
        title: "Title",
        description: "Description",
      }
    ).then((value) => {
      message.inlineReply("Bin posted: " + value.url);
    });
  },
};
