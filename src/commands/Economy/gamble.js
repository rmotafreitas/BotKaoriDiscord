const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;

module.exports = {
  name: "gamble",
  cooldown: 4000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const profile = new econmyDB(message.author.id);
    await profile.init();
    if (!Number.isInteger(parseInt(args[0])))
      return message.inlineReply("Hey, that's not a whole number >:(");

    var bet = parseInt(args[0]);

    if (bet <= 0) {
      return message.inlineReply("Hey, that's not a whole number >:(");
    }

    if (profile.money < bet)
      return message.inlineReply("You Don't have that much to bet"); //

    let chances = ["win", "lose"];

    var pick = chances[Math.floor(Math.random() * chances.length)];

    if (pick == "lose") {
      await profile.addMoney(-bet);
      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.tag)
        .setTitle("Bet!")
        .setImage(
          "https://pa1.narvii.com/7460/c158a88bc4e28c0fa2a8b9ba1e206e2e191fe651r1-540-304_hq.gif"
        )
        .setThumbnail(
            message.author.displayAvatarURL({ size: 4096, dynamic: true })
        )
        .setDescription(`$${args[0]}, You lost. \nNew Balance: $${profile.money}`);
      return message.channel.send(embed);
    } else {
      await profile.addMoney(bet);
      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.tag)
        .setTitle("Bet!")
        .setImage(
          "https://pa1.narvii.com/7460/c158a88bc4e28c0fa2a8b9ba1e206e2e191fe651r1-540-304_hq.gif"
        )
        .setThumbnail(
            message.author.displayAvatarURL({ size: 4096, dynamic: true })
        )
        .setDescription(`$${args[0]}, You win. \nNew Balance: $${profile.money}`);
      return message.channel.send(embed);
    }
  },
};
