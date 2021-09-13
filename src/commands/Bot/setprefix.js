const { Client, Message, MessageEmbed } = require("discord.js");
const { embed } = require('../../tools/classes/fastEmbed');
const prefixs = require("../../models/prefixs");
module.exports = {
  name: "setprefix",
  cooldown: 1000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const newPrefix = args[0];
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.inlineReply(
        embed.error("You need to have the `MANAGE_GUILD` permission.")
      );
    }
    if (!newPrefix) {
      return message.inlineReply(
        embed.error("You need to input a new prefix in the command.")
      );
    }
    let guild = await prefixs.findOne({
      guildID: message.guild.id,
    });
    if (!guild) {
      const NewGuildPrefix = new prefixs({
        guildID: guild.id,
        prefix: newPrefix,
      });

      NewGuildPrefix.save().catch((err) => console.log(err));
    } else {
      guild.prefix = newPrefix;
      guild.save().catch((err) => console.log(err));
      return message.inlineReply(
        embed.completed("My new prefix for this guild is `" + newPrefix + "`")
      );
    }
  },
};
