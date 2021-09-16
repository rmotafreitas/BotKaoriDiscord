const { Client, Message, MessageEmbed } = require("discord.js");
const getTuneInData = require("./../../tools/getTuneInData").getTuneInData;
const getOnlineRadioBoxData =
  require("./../../tools/getTodayFMData").getOnlineRadioBoxData;
const { radios } = require("../../Collection");
const { getStereo_animeData } = require("../../tools/getStereo_animeData");
const { getAnimuFmData } = require("../../tools/getAnimuFmData");
const ms = require("parse-ms");

module.exports = {
  name: "now-playing",
  cooldown: 3000,
  aliases: ["np"],
  category: "Music",
  description: "Show's what is playing now",
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

    let progress;
    let calcul;
    let total;
    let progressBar;
    switch (radio.name) {
      case "Rfm Radio":
        description += "\n Só grandes músicas!";
        break;
      case "Music Radio":
        const dataRadioBox = await getOnlineRadioBoxData(radio.url);
        description +=
          `🎵 __Playing:__ *${dataRadioBox.music}*` +
          "\n" +
          `🎙 __From:__ *${dataRadioBox.from}*`;
        embed.setThumbnail(dataRadioBox.album);
        break;
      case "Anime Stereo":
        const data = await getStereo_animeData();

        progress = ms(data.progress);
        total = ms(data.length);

        progressBar = [
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
        ];
        calcul = Math.round(
          progressBar.length * (data.progress / data.length)
        );
        progressBar[calcul] = "🔘";

        description +=
          `🎵 __Playing:__ *${data.title}*` +
          "\n" +
          `🎙 __From:__ *${data.artist}*\n` +
          `0${progress.minutes}:${
            progress.seconds.toString().length == 1
              ? `0${progress.seconds}`
              : progress.seconds
          } ${progressBar.join("")} 0${total.minutes}:${
            total.seconds.toString().length == 1
              ? `0${total.seconds}`
              : total.seconds
          }`;
        embed.setThumbnail(data.img);
        break;
      case "Animu":
        const AnimuData = await getAnimuFmData();
        progress = ms(Date.now() - AnimuData.timestart);
        total = ms(AnimuData.duration);

        progressBar = [
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
          "▬",
        ];
        const progressNow = Date.now() - AnimuData.timestart;
        calcul = Math.round(
          progressBar.length * (progressNow / AnimuData.duration)
        );
        progressBar[calcul] = "🔘";

        description +=
          `🎵 __Playing:__ *${AnimuData.title}*` +
          "\n" +
          `🎙 __From:__ *${AnimuData.artist}*\n` +
          `0${progress.minutes}:${
            progress.seconds.toString().length == 1
              ? `0${progress.seconds}`
              : progress.seconds
          } ${progressBar.join("")} 0${total.minutes}:${
            total.seconds.toString().length == 1
              ? `0${total.seconds}`
              : total.seconds
          }`;
        embed.setThumbnail(AnimuData.artworks.large);

        break;
      default:
        const dataTuneIN = await getTuneInData(radio.url);
        description +=
          `🎵 __Playing:__ *${dataTuneIN.music}*` +
          "\n" +
          `🎙 __From:__ *${dataTuneIN.from}*`;
        break;
    }
    embed.setDescription(description);

    message.channel.send(embed);
  },
};
