const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");
const capitalize = require("../../tools/capitalize").capitalize;
const colors = require("../../json/colors.json");

module.exports = {
  name: "radio",
  cooldown: 3*60*1000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    //? Radio handler
    let radioNames = [];
    const radioFiles = fs
      .readdirSync(path.join(__dirname, "/../../Radios"))
      .filter((file) => file.endsWith(".js"));

    for (var filename of radioFiles) {
      const radio = require(`./../../Radios/${filename}`);
      radioNames.push(radio.name);
    }

    const query = args.join(" ");
    if (!query) {
      const embed = new MessageEmbed()
        .setTimestamp()
        .setColor(colors.blue)
        .setTitle("Radios: ");

      for (var filename of radioFiles) {
        const radio = require(`./../../Radios/${filename}`);
        //console.log(radio);
        embed.addField(
          `${radio.emoji} ${await capitalize(radio.name)}`,
          radio.description,
          true
        );
      }

      return message.inlineReply(
        "You need to choose a radio: `radio radio-name`",
        embed
      );
    } else {
      if (!radioNames.includes(query.toLowerCase())) {
        return message.inlineReply("That radio dosen't exist!");
      } else {
        for (var filename of radioFiles) {
          const radio = require(`./../../Radios/${filename}`);
          if (radio.name == query) {
            await radio.run(client, message, args);
          }
        }
      }
    }
  },
};
