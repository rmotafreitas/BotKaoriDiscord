const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
const colors = require("../../json/colors.json");

module.exports = {
  name: "joking",
  cooldown: 1000,
  category: "Interactions",
  description: "Just a joke r-right...?",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const getGif = async () => {
      const response = await axios.get(
        "https://anime-reactions.uzairashraf.dev/api/reactions",
        {
          params: {
            category: "calm-down",
          },
        }
      );
      return response.data;
    };
    const reactions = await getGif();
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    const embed = new MessageEmbed()
        .setImage(reaction)
        .setTitle(`${message.author.username} is joking!`)
        .setColor(colors.green)
        .setTimestamp();
    message.channel.send(embed);
  },
};
