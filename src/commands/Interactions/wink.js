const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const colors = require("../../json/colors.json");

module.exports = {
  name: "wink",
  description: "wink",
  cooldown: 3,
  run: async (client, message, args) => {
    const url = "https://some-random-api.ml/animu/wink";

    let response, data;
    try {
      response = await axios.get(url);
      data = response.data;
    } catch (e) {
      return message.channel.send(`An error occured!`);
    }

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor(colors.blue)
      .setTitle(
        `${message.author.username} winked...`
      )
      .setImage(data.link);

    await message.channel.send(embed);
  },
};
