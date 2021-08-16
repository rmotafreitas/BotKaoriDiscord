const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "play",
  cooldown: 3*60*1000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.inlineReply("Please join a voice channel!");

    const query = args.join(" ");

    if (!query) return message.inlineReply("Please enter a song name!");

    await client.player.play(message, query);
  },
};
