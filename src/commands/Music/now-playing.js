const { Client, Message, MessageEmbed } = require("discord.js");
const getTuneInData = require("./../../tools/getTuneInData").getTuneInData;
const getOnlineRadioBoxData = require("./../../tools/getOnlineRadioBoxData").getOnlineRadioBoxData;
const { radios } = require("../../Collection");

module.exports = {
  name: "now-playing",
  cooldown: 5 * 1000,
  aliases: ["np"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const radio = radios.get(message.guild.id);

    if (!radio) return message.inlineReply("There's nothing playing!");
    
    let embed = Object.create(radio.radioEmbed);
    let description =
      radio.radioEmbed.description +
      "🔊 __Voice Channel:__ " +
      "`" +
      message.guild.me.voice.channel.name +
      "`\n";
    switch (radio.name) {
      case "Rfm Radio":
        description += "\n Só grandes músicas!";
        break;
      case "Music Radio":
        const dataRadioBox = await getOnlineRadioBoxData(radio.url);
        description += `🎵 __Playing:__ *${dataRadioBox.songName}*` +
        "\n" +
        `🎙 __From:__ *${dataRadioBox.author}*`;
        embed.setThumbnail(dataRadioBox.albumImg);
        break;
      default:
        const data = await getTuneInData(radio.url);
        description += `🎵 __Playing:__ *${data.music}*` +
        "\n" +
        `🎙 __From:__ *${data.from}*`;
        break;
    }
    embed.setDescription(description);

    message.channel.send(embed);
  },
};
