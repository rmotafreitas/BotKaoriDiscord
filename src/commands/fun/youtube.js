const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: "youtube",
  cooldown: 2,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    if (!args.join(" "))
      return message.channel.send("You need to provide text!");

    let msg = args.join(" ").substring(0, 60);
    const e = user.displayAvatarURL({ format: "png" });

    const img = await canvacord.Canvas.youtube({
      username: `${user.username}`,
      content: msg.toString(),
      avatar: e,
      dark: false,
    });

    let attachment = new MessageAttachment(img, "youtube.png");
    return message.channel.send(attachment);
  },
};
