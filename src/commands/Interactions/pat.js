const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const colors = require("../../json/colors.json");

module.exports = {
  name: "pat",
  cooldown: 1000,
  category: "Interactions",
  description: "For those with soft hands UωU",
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    if (!member)
      return message.channel.send("You must mention someone to hug them!");
    const url = "https://some-random-api.ml/animu/pat";

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
        `${message.author.username} pat ${
          message.mentions.users.first().username
        }...`
      )
      .setImage(data.link);

    await message.channel.send(embed);
  },
};
