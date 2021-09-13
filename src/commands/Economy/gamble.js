const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { embed } = require('../../tools/classes/fastEmbed');

module.exports = {
  name: "gamble",
  cooldown: 4000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (isNaN(args[0]) || !args[0] || parseInt(args[0]) <= 2) {
      return message.inlineReply(embed.error("You need to input a int number, greater than 2"))
    }

    const bet = parseInt(args[0]);

    const profile = new econmyDB(message.author.id);
    await profile.init();

    if (profile.money < bet)
      return message.inlineReply("You Don't have that much to bet"); //

    const chances = ["win", "lose"];
    const pick = chances[Math.floor(Math.random() * chances.length)];

    if (pick == "lose") {
      await profile.addMoney(-bet);
      return message.inlineReply(embed.lose(`You lost ${bet}$, now you have: ${profile.money}$ 😥`))
    } else {
      await profile.addMoney(bet);
      return message.inlineReply(embed.win(`You win ${bet}$, now you have: ${profile.money}$ 😎`))
    }
  },
};
