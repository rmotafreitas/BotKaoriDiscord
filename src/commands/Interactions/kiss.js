const { Client, Message, MessageEmbed } = require("discord.js");
const retribution = require("../../tools/retribution").retribution;
const HMfull = require("hmfull");

module.exports = {
  name: "kiss",
  cooldown: 1000,
  category: "Interactions",
  description: "Leave your memories in one action >:3",
  usage: "kiss [@mention]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const target = message.mentions.users.first();
    if (!target) return message.inlineReply("Please ping a usre to kiss");

    let users = [target, message.author];

    let kissGif = await HMfull.Nekos.sfw.kiss();

    const KissEmbed = new MessageEmbed()
      .setTitle("Love is in the air 💘")
      .setFooter("Cute")
      .setImage(kissGif.url)
      .setTimestamp()
      .setColor("RED")
      .setDescription(`${users[0]} kissed ${users[1]}`);

    return retribution(KissEmbed, "😘", users, message, "kissed");
  },
};
