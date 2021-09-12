const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const embeds = require("../../tools/embeds").embeds;
const badWords = require("../../json/badWords.json");

module.exports = {
  name: "setbio",
  cooldown: 3000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const profile = new econmyDB(message.author.id);
    await profile.init();
    const bio = args.join(" ");
    const Embeds = await embeds();
    if (!bio) {
      return message.inlineReply(
        await Embeds.error("You forget to type the bio? xD")
      );
    } else {
      if (bio.length > 75) {
        return message.inlineReply(
          await Embeds.error(
            `The char limit is 75, you have wrote ${bio.length} chars!`
          )
        );
      }
      for (i = 0; i < badWords.words.length; i++) {
        if (bio.toLocaleLowerCase().includes(badWords.words[i])) {
          return message.inlineReply(
            await Embeds.error("Please don't use that word in your bio!")
          );
        }
      }
      await profile.setBio(bio);
      return message.inlineReply(
        await Embeds.completed(`Your new bio is: ${bio}`)
      );
    }
  },
};
