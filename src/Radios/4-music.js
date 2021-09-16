const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require("../json/colors.json");
const { radios } = require("../Collection");
const getRadioData = require("../tools/getTodayFMData").getOnlineRadioBoxData;

module.exports = {
  name: "us-music",
  fullname: "Today FM",
  description: "Ireland's most popular independent radio station.",
  link: "https://www.todayfm.com",
  emoji: "<:TodayFM:888100669318389760>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.inlineReply("You need to be on a voice channel");

    const url = "https://irishradiolive.com/today-fms";

    const data = await getRadioData(url);
    const embed = new MessageEmbed()
      .setTitle("Playing Radio Music!")
      .setColor(colors.blue)
      .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n` +
          "🔊 __Voice Channel:__ " +
          "`" +
          message.member.voice.channel.name +
          "`\n" +
          `🎵 __Playing:__ *${data.music}*` +
          "\n" +
          `🎙 __From:__ *${data.from}*`
      )
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(data.album);

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
      require("https").get(
        "https://edge7.audioxi.com/TDAAC?aw_0_1st.playerId=CGLWebPlayer",
        (res) => {
          connection.play(res);
          message.channel.send(embed);
        }
      );
    });

    radios.set(message.guild.id, {
      name: "Music Radio",
      url,
      textChannel: message.channel,
      radioEmbed,
    });
  },
};
