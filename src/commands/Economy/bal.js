const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const badges = require("../../json/emojis.json");

module.exports = {
  name: "account",
  cooldown: 1000,
  aliases: ["bal"],
  category : 'Economy',
  description : 'View your economy account',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const target =
      message.mentions.users.last() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const profile = new econmyDB(target.id);
    await profile.init();
    const embed = new MessageEmbed()
      .setAuthor(target.username, target.displayAvatarURL())
      .setColor("BLUE")
      .setTimestamp()
      .setFooter("Kaori Economy System")
      .setDescription(
        `‣ Money: ${profile.money}$\n` +
          `‣ Badges: ${
            profile.badges.length
            ?  profile.badges.map((badge) => badges[badge]).join(" ")
            : "None"
          }\n` +
          `‣ Marry: ${
            profile.marry == null
              ? "Not married"
              : client.users.cache.get(profile.marry)
          }\n` +
          `‣ Bio: ${
            profile.bio == null ? "This user dosen't have a bio" : profile.bio
          }\n` +
          `‣ Level: ${profile.workLevel} [${profile.xp}/${
            profile.workLevel * 100
          }]`
      );
    return message.inlineReply(embed);
  },
};
