const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require("../json/colors.json");
const { radios } = require("../Collection");
const getOnlineRadioBoxData = require("./../tools/getOnlineRadioBoxData")
  .getOnlineRadioBoxData;

module.exports = {
  name: "music",
  description: "A us pop music\nradio!",
  emoji: "🎙",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.inlineReply("You need to be on a voice channel");

    const url =
      "https://onlineradiobox.com/us/977todayshits/playlist/?cs=us.977todayshits";

    const data = await getOnlineRadioBoxData(url);

    const embed = new MessageEmbed()
      .setTitle("Playing Radio Music!")
      .setColor(colors.blue)
      .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n` +
          "🔊 __Voice Channel:__ " +
          "`" +
          message.member.voice.channel.name +
          "`\n" +
          `🎵 __Playing:__ *${data.songName}*` +
          "\n" +
          `🎙 __From:__ *${data.author}*`
      )
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(
        data.albumImg != ""
          ? data.albumImg
          : "https://media0.giphy.com/media/lqSDx8SI1916ysr4eq/giphy.gif"
      );

    const radioEmbed = new MessageEmbed()
      .setTitle("Playing Radio Music!")
      .setColor(colors.blue)
      .setDescription(`📝 __Text Channel:__ ${message.channel}\n`) //
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(
        "https://media0.giphy.com/media/lqSDx8SI1916ysr4eq/giphy.gif"
      );

    message.member.voice.channel.join().then((connection) => {
      require("https").get("https://16803.live.streamtheworld.com/977_HITSAAC_SC", (res) => {
        connection.play(res);
        message.channel.send(embed);
      });
    });

    radios.set(message.guild.id, {
      name: "Music Radio",
      url,
      textChannel: message.channel,
      radioEmbed,
    });
  },
};
