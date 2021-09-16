const { Client, Message, MessageEmbed } = require("discord.js");
const { radios } = require("../Collection");
const { getStereo_animeData } = require("../tools/getStereo_animeData");
const ms = require("parse-ms");

module.exports = {
  name: "anime-s",
  fullname: "Stereo Anime",
  link: "https://stereo-anime.blogspot.com",
  emoji: "<:StereoAnime:888099906324140032>",
  description: "The best anime radio station on the internet",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.inlineReply("You need to be on a voice channel");

    const data = await getStereo_animeData();
    const progress = ms(data.progress);
    const total = ms(data.length);

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
    const calcul = Math.round(
      progressBar.length * (data.progress / data.length)
    );
    progressBar[calcul] = "🔘";
    const embed = new MessageEmbed()
      .setTitle("Playing Stereo Anime!")
      .setColor("BLUE")
      .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n` +
          "🔊 __Voice Channel:__ " +
          "`" +
          message.member.voice.channel.name +
          "`\n" +
          `🎵 __Playing:__ *${data.title}*` +
          "\n" +
          `🎙 __From:__ *${data.author}*\n` +
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
      .setThumbnail(data.img);

    message.member.voice.channel.join().then((connection) => {
      require("https").get("https://evcast.mediacp.eu/stereoanime/", (res) => {
        connection.play(res);
        message.channel.send(embed);
      });
    });

    const radioEmbed = new MessageEmbed()
      .setTitle("Playing Stereo Anime!")
      .setColor("BLUE")
      .setDescription(`📝 __Text Channel:__ ${message.channel}\n`) //
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      );

    radios.set(message.guild.id, {
      name: "Anime Stereo",
      radioEmbed,
      textChannel: message.channel,
    });
  },
};
