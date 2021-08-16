const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require("../../json/colors.json");

module.exports = {
  name: "avatar",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;

    const avatarPng = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
    const avatarJpg = user.avatarURL({ dynamic: true, format: "jpg", size: 1024 });
    const avatarWebp = user.avatarURL({ dynamic: true, format: "webp", size: 1024 });

    const embed = new MessageEmbed()
      .setColor(colors.white)
      .setTitle(`Avatar from: ${user.username}`)
      .setDescription(`**➥** [**__Png__**](${avatarPng})\n**➥** [**__Jpg__**](${avatarJpg})\n**➥** [**__Webp__**](${avatarWebp})`)
      .setImage(avatarWebp)
      .setTimestamp()
      .setFooter(
        `• Author: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: false, size: 1024 })
      );
    await message.inlineReply(embed);
  },
};
