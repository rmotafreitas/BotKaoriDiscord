const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  cooldown: 3*60*1000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await client.player.skip(message);
    message.react("⏭");
  },
};
