const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    console.log(message.content);
      const sayMessage = args.join(" ");
      message.channel.send(`${sayMessage}\n\n💌 *Sent by:*  ${message.author}`);
  },
};
