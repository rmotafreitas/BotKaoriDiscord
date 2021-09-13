const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
const colors = require("../../json/colors.json");

module.exports = {
  name: "cat",
  cooldown: 2000,
  category : 'Animals',
  description : 'Shows a cat picture and a fact',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let url = "https://some-random-api.ml/img/cat";

    let responseImg, dataImg;
    try {
      responseImg = await axios.get(url);
      dataImg = responseImg.data;
    } catch (e) {
      return message.channel.send(`An error occured!`);
    }

    url = "https://some-random-api.ml/facts/cat";
    let responseFact, dataFact;
    try {
        responseFact = await axios.get(url);
        dataFact = responseFact.data;
    } catch (e) {
      return message.channel.send(`An error occured!`);
    }

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor(colors.blue)
      .setTitle(
        "Cat 🐱"
      )
      .setDescription(dataFact.fact)
      .setImage(dataImg.link);

    await message.inlineReply(embed);
  },
};
