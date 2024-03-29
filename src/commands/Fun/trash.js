const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const { Canvas } = require("canvacord");
module.exports = {
  name: "trash",
  cooldown: 2000,
  category: "Fun",
  usage: "trash [@mention]",
  description: 'Tag a user to "delete"',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({ format: "png" });

    const img = await Canvas.delete(avatar);

    message.channel.send(new MessageAttachment(img, "deletetrash.png"));
  },
};
