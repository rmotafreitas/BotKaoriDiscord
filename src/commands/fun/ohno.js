const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const { Canvas } = require("canvacord");
module.exports = {
  name: "ohno",
  cooldown: 2000,
  category: "Fun",
  description: "Type some words to do a meme (It's cute | Oh no it's stupid)",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const words = args.join(" ");

    const img = await Canvas.ohno(words);

    message.channel.send(new MessageAttachment(img, "ohno.png"));
  },
};
