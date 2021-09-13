const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { embed } = require('../../tools/classes/fastEmbed');
const ms = require("parse-ms");

module.exports = {
  name: "work",
  cooldown: 1000,
  category : 'Economy',
  description : 'Win money working (400$)[12 hours timeout]',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const profile = new econmyDB(message.author.id);
    await profile.init();
    if (profile.canWork()) {
      await profile.workMethod();
      return message.inlineReply(
        embed.completed(`You won 400$ working!`)
      );
    } else {
      const time = ms(profile.workTimeout - (Date.now() - profile.work));
      return message.inlineReply(
        embed.error(`You need to wait: ${time.hours}h ${time.minutes}m ${time.seconds}s`)
      );
    }
  },
};
