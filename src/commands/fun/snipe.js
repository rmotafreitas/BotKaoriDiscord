const { Client, Message, MessageEmbed } = require("discord.js");
const { snipes } = require('../../Collection');

module.exports = {
  name: "snipe",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const msg = snipes.get(message.channel.id);
    if (!msg) return message.reply("There's nothing to snipe!");

    const embed = new MessageEmbed()
      .setAuthor(msg.author, msg.member.user.displayAvatarURL())
      .setDescription(msg.content)
      .setFooter("Get sniped lol")
      .setColor("RANDOM")
      .setTimestamp();

    if (msg.image) embed.setImage(msg.image);
    message.channel.send(embed);
  },
};
