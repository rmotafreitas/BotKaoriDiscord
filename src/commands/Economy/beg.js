const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { embed } = require('../../tools/classes/fastEmbed');
const ms = require("parse-ms");

module.exports = {
  name: "beg",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const profile = new econmyDB(message.author.id);
    await profile.init();
    if (profile.canBeg()) {
      await profile.begMethod();
      return message.inlineReply(
        embed.completed(`You won 100$ begging!`)
      );
    } else {
      const time = ms(profile.begTimeout - (Date.now() - profile.beg));
      return message.inlineReply(
         embed.error(`You need to wait: ${time.hours}h ${time.minutes}m ${time.seconds}s`)
      );
    }
  },
};
