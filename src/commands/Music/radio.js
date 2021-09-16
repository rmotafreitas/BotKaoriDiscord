const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");
const colors = require("../../json/colors.json");

module.exports = {
  name: "radio",
  category: "Music",
  cooldown: 10000,
  description: "Plays a music radio in a voice call",
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
      let description = "";
      for (var filename of radioFiles) {
        const radio = require(`./../../Radios/${filename}`);
        //console.log(radio);
        description += `${radio.emoji} __[${radio.fullname}](${radio.link})__\n` +
        `> Command: ${'`'}${client.prefix}radio ${radio.name}${'`'}\n` +
        `> Description: ${radio.description}\n\n`
      }
      embed.setDescription(description);

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
