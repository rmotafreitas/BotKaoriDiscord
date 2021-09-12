const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const embeds = require("../../tools/embeds").embeds;
const ms = require("parse-ms");

module.exports = {
  name: "weekly",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const profile = new econmyDB(message.author.id);
    await profile.init();
    const Embeds = await embeds();
    if (profile.canWeekly()) {
      await profile.weeklyMethod();
      return message.inlineReply(
        await Embeds.completed(`You won 5600$!`)
      );
    } else {
      const time = ms(profile.weeklyTimeout - (Date.now() - profile.weekly));
      return message.inlineReply(
        await Embeds.error(`You need to wait: ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`)
      );
    }
  },
};
