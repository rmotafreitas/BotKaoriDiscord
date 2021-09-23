const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;

module.exports = {
  name: "shop",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var skinColors = JSON.parse(
      JSON.stringify(require("../../json/skins.json"))
    );
    const profile = new econmyDB(message.author.id);
    await profile.init();
    const skins = profile.skins;

    skins.forEach(function (item, index, array) {
      skinColors[skins[index]].active = true;
    });

    const desc = ["**BALANCE SKINS**"];
    for (const key in skinColors) {
      if (!skinColors[key].active) {
        desc.push(
          `> ${skinColors[key].emoji} ${key} - ${skinColors[key].price}$`
        );
      }
    }

    let embed = new MessageEmbed()
      .setTitle("Shop")
      .setColor("BLUE")
      .setFooter("To view an item use the command: buy Name")
      .setDescription(desc);
    message.channel.send(embed);
  },
};
