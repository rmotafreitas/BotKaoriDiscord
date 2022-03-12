const { Client, Message, MessageEmbed } = require("discord.js");
const badges = require("../../json/emojis.json");

module.exports = {
  name: "badges",
  category: "Economy",
  description: "How to get the badges",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setFooter("Kaori badges guide")
      .setTitle("How to win badges?")
      .setDescription(
        `${badges.BugHunter.emoji} - Report a bug to the dev. ${"`"}${
          client.prefix
        }report${"`"}\n` +
          `${badges.DeveloperBadge.emoji} - Only my developer has this badge\n` +
          `${badges.FanartBadge.emoji} - Do a fanart to me\n` +
          `${badges.KaoriModBadge.emoji} - My mod's have this badge\n` +
          `${badges.MarryBadge.emoji} - You have this badge if you are married\n` +
          `${badges.PremiumBadge.emoji} - Buy kaori premium\n` +
          `${badges.SnakeBadge.emoji} - Have the top snake score\n` +
          `${badges.TopBadge.emoji} - Be in #1 in Kaori Economy\n` +
          `${badges.SkinMakerBadge.emoji} - Make a skin for Economy, __[more details](https://discord.gg/wD7T6Ty)__`
      );
    message.inlineReply(embed);
  },
};
