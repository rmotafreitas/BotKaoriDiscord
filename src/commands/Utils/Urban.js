const { Client, Message, MessageEmbed, ReactionUserManager } = require("discord.js");
const axios = require("axios");
const colors = require("../../json/colors.json");

module.exports = {
  name: "urban",
  cooldown: 1000,
  category: "Utils",
  description: "Make a search on the urban dictionary, about a word given",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let query = args.join(" ");
    if (!query)
      return message.inlineReply(
        "Please type a word to seacrh on the urban dictionary!"
      );
    query = encodeURIComponent(query);
    const {
      data: { list },
    } = await axios.get(
      `https://api.urbandictionary.com/v0/define?term=${query}`
    );

    const [answer] = list;

    if(!answer) return message.inlineReply("I dind't fine that word!");


    function trim(input) {
      return input.length > 1024 ? `${input.slice(0, 1015)} [...]` : input;
    }

    message.inlineReply(
      new MessageEmbed()
        .setAuthor("📕 Urban Dictionary")
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .setColor(colors.red)
        .addField("Definition: ", trim(answer.definition))
        .addField("Exemple: ", trim(answer.example))
    );
  },
};
