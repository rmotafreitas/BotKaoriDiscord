const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
const colors = require("../../json/colors.json");

module.exports = {
  name: "dance",
  cooldown: 1000,
  category: "Interactions",
  description: "You need dancing? Ok, show what you can!",
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
            category: "dance",
          },
        }
      );
      return response.data;
    };
    const reactions = await getGif();
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    const embed = new MessageEmbed()
        .setImage(reaction)
        .setTitle(`${message.author.username} is dancing!`)
        .setColor(colors.green)
        .setTimestamp();
    message.channel.send(embed);
  },
};
