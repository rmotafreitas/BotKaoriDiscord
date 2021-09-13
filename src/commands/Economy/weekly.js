const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { embed } = require('../../tools/classes/fastEmbed');
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
    if (profile.canWeekly()) {
      await profile.weeklyMethod();
      return message.inlineReply(
        await embed.completed(`You won 5600$!`)
      );
    } else {
      const time = ms(profile.weeklyTimeout - (Date.now() - profile.weekly));
      return message.inlineReply(
        embed.error(`You need to wait: ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`)
      );
    }
  },
};
