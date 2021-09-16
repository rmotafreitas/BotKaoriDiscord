const { Client, Message, MessageEmbed } = require("discord.js");
const { radios } = require("../Collection");
const { getAnimuFmData } = require("../tools/getAnimuFmData");
const ms = require("parse-ms");

module.exports = {
  name: "animu",
  fullname: "Animu FM Radio",
  link: "https://www.animu.com.br",
  emoji: "<:AnimuFM:888099769656963072>",
  description: "The most MOE Radio of Brazil",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.inlineReply("You need to be on a voice channel");

    const data = await getAnimuFmData();
    const progress = ms(Date.now() - data.timestart);
    const total = ms(data.duration);

    const progressBar = [
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
    const progressNow = Date.now() - data.timestart;
    const calcul = Math.round(
      progressBar.length * (progressNow / data.duration)
    );
    progressBar[calcul] = "🔘";
    const embed = new MessageEmbed()
      .setTitle("Playing Animu FM!")
      .setColor("PURPLE")
      .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n` +
          "🔊 __Voice Channel:__ " +
          "<#" +
          message.member.voice.channel.id +
          ">\n" +
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
          }`
      )
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(data.artworks.large);

    message.member.voice.channel.join().then((connection) => {
      require("https").get(
        "https://cast.animu.com.br:9006/stream?0.9715900745894794",
        (res) => {
          connection.play(res);
          message.channel.send(embed);
        }
      );
    });

    const radioEmbed = new MessageEmbed()
      .setTitle("Playing Animu FM!")
      .setColor("PURPLE")
      .setDescription(`📝 __Text Channel:__ ${message.channel}\n`) //
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      );

    radios.set(message.guild.id, {
      name: "Animu",
      radioEmbed,
      textChannel: message.channel,
    });
  },
};
