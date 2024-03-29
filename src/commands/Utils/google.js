const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require("../../json/colors.json");

module.exports = {
  name: "google",
  category: "Utils",
  cooldown: 1000,
  description: "Make a seacrh in Google",
  usage: "google [What do you want to search]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join("+");
    if (!query)
      return message.inlineReply("Please give me a something to search!");
    const search = `https://letmegooglethat.com/?q=${query}`;
    const embed = new MessageEmbed()
      .setAuthor(
        "Google",
        "https://tekgenius.pt/wp-content/uploads/2016/12/google-logo-icon-PNG-Transparent-Background.png"
      )
      .setColor(colors.orange)
      .setDescription(`[🔎 **__Search!__**](${search})`)
      .setFooter(
        `• Requested by: ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setTimestamp();
    message.inlineReply(embed);
  },
};
