const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { embed } = require('../../tools/classes/fastEmbed');
const badWords = require("../../json/badWords.json");

module.exports = {
  name: "setbio",
  cooldown: 3000,
  category : 'Economy',
  description : 'Change your economy account bio',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const profile = new econmyDB(message.author.id);
    await profile.init();
    const bio = args.join(" ");
    
    if (!bio) {
      return message.inlineReply(
        embed.error("You forget to type the bio? xD")
      );
    } else {
      if (bio.length > 75) {
        return message.inlineReply(
          await embed.error(
            `The char limit is 75, you have wrote ${bio.length} chars!`
          )
        );
      }
      for (i = 0; i < badWords.words.length; i++) {
        if (bio.toLocaleLowerCase().includes(badWords.words[i])) {
          return message.inlineReply(
            embed.error("Please don't use that word in your bio!")
          );
        }
      }
      await profile.setBio(bio);
      return message.inlineReply(
        embed.completed(`Your new bio is: ${bio}`)
      );
    }
  },
};
