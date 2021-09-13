const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { embed } = require('../../tools/classes/fastEmbed');
const ms = require("parse-ms");

module.exports = {
  name: "daily",
  cooldown: 1000,
  category : 'Economy',
  description : 'Win daily money (800$)[1 day timeout]',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const profile = new econmyDB(message.author.id);
    await profile.init();
    if (profile.canDaily()) {
      await profile.dailyMethod();
      return message.inlineReply(
        embed.completed(`You won 800$!`)
      );
    } else {
      const time = ms(profile.dailyTimeout - (Date.now() - profile.daily));
      return message.inlineReply(
        embed.error(`You need to wait: ${time.hours}h ${time.minutes}m ${time.seconds}s`)
      );
    }
  },
};
