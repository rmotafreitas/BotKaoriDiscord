const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { embed } = require("../../tools/classes/fastEmbed");

module.exports = {
  name: "pay",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const target =
      message.mentions.users.last() || client.users.cache.get(args[0]);
    let amount = args[1];
    if (!target) {
      return message.inlineReply(
        embed.error("You need to mention a person to pay")
      );
    }
    if (target.id == message.author.id) {
      return message.inlineReply(embed.error("You can't pay to yourself"));
    }
    if (!amount || isNaN(amount)) {
      return message.inlineReply(
        embed.error("Please specify an amount you want to pay.")
      );
    }
    amount = parseInt(amount);
    if (amount < 2) {
      return message.inlineReply(embed.error("You need to pay more than 2$"));
    }
    const authorProfile = new econmyDB(message.author.id);
    await authorProfile.init();
    const targetProfile = new econmyDB(target.id);
    await targetProfile.init();

    if (authorProfile.money < amount) {
      return message.inlineReply(embed.error("You don't have that much"));
    }
    await authorProfile.addMoney(-amount);
    await targetProfile.addMoney(amount);

    return message.inlineReply(
      embed.completed(
        `${message.author.username} give ${amount}$ to ${target.username}`
      )
    );
  },
};
