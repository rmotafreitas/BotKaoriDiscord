const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require("../json/colors.json");
const { radios } = require('../Collection');
const getTuneInData = require("../tools/getTuneInData").getTuneInData;

module.exports = {
  name: "lofi",
  emoji: "<:LofiRadio:888100791230009455>",
  fullname: "Chillhop Radio - Lofi Hiphop Beats - Chillsky",
  link: "http://www.chillsky.com",
  description: "A relaxing radio with lofi music!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.voice.channel) return message.inlineReply("You need to be on a voice channel");
    const url = "https://tunein.com/radio/Chillhop-Radio---Lofi-Hiphop-Beats---Chillsky-s288329/";
    const data = await getTuneInData(url);
    const embed = new MessageEmbed()
      .setTitle("Playing Lofi Radio!")
      .setColor(colors.orange)
      .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n` +
          "🔊 __Voice Channel:__ " +
          "<#" +
          message.member.voice.channel.id +
          ">\n" +
          `🎵 __Playing:__ *${data.music}*`+
          "\n" +
          `🎙 __From:__ *${data.from}*`
      )
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(
        "https://media4.giphy.com/media/XbJYBCi69nyVOffLIU/200.gif"
      );
    message.member.voice.channel.join().then((connection) => {
      require("http").get("http://usa9.fastcast4u.com/proxy/jamz?mp=/1;", (res) => {
        connection.play(res);
        message.channel.send(embed);
      });
    });

    const radioEmbed = new MessageEmbed()
    .setTitle("Playing Lofi Radio!")
    .setColor(colors.orange)
    .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n` 
    )
    .setTimestamp()
    .setFooter(
      `Session started by: ${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail(
      "https://media4.giphy.com/media/XbJYBCi69nyVOffLIU/200.gif"
    );

    radios.set(message.guild.id, {
      name: "Lofi Radio",
      url,
      textChannel: message.channel,
      radioEmbed
    });
  },
};
