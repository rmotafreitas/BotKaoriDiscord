const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("parse-ms");
const econmyDB = require("../../tools/classes/economy").economyDB;

module.exports = {
  name: "times",
  aliases: ["t"],
  cooldown: 1000,
  description: "Show how many time left, to you win money",
  category: "Economy",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const profile = new econmyDB(message.author.id);
    await profile.init();
    const beg = ms(profile.begTimeout - (Date.now() - profile.beg));
    const work = ms(profile.workTimeout - (Date.now() - profile.work));
    const daily = ms(profile.dailyTimeout - (Date.now() - profile.daily));
    const weekly = ms(profile.weeklyTimeout - (Date.now() - profile.weekly));

    const description = [];
    if (profile.canBeg()) {
      description.push(`Beg: ✅`);
    } else {
      description.push(`Beg: ${beg.hours}h ${beg.minutes}m ${beg.seconds}s`);
    }
    if (profile.canWork()) {
      description.push(`Work: ✅`);
    } else {
      description.push(
        `Work: ${work.hours}h ${work.minutes}m ${work.seconds}s`
      );
    }
    if (profile.canDaily()) {
      description.push(`Daily: ✅`);
    } else {
      description.push(
        `Daily: ${daily.hours}h ${daily.minutes}m ${daily.seconds}s`
      );
    }
    if (profile.canWeekly()) {
      description.push(`Weekly: ✅`);
    } else {
      description.push(
        `Weekly: ${weekly.days}d ${weekly.hours}h ${weekly.minutes}m ${weekly.seconds}s`
      );
    }

    const embed = new MessageEmbed()
      .setTitle("Action times ⏱")
      .setDescription(description)
      .setColor("BLUE");
    return message.inlineReply(embed);
  },
};
