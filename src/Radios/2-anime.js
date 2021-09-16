const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require("../json/colors.json");
const getTuneInData = require("../tools/getTuneInData").getTuneInData;
const { radios } = require('../Collection');

module.exports = {
  name: "anime-forever",
  fullname: "Radio Forever Anime",
  link: "https://twitter.com/Radio4everAnime",
  emoji: "🍙",
  description: "The New Anime Music, Remixes and Videogame Music.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.inlineReply("You need to be on a voice channel");
    const url = "https://tunein.com/radio/Radio-Forever-Anime-s118544/";
    const data = await getTuneInData(url);

    const embed = new MessageEmbed()
      .setTitle("Playing Anime Radio!")
      .setColor(colors.green)
      .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n` +
          "🔊 __Voice Channel:__ " +
          "`" +
          message.member.voice.channel.name +
          "`\n" +
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
        "https://media.tenor.com/images/d44a2eb411d161183a65c48d66142688/tenor.gif"
      );

    const radioEmbed = new MessageEmbed()
      .setTitle("Playing Anime Radio!")
      .setColor(colors.green)
      .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n`
      )
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setThumbnail(
        "https://media.tenor.com/images/d44a2eb411d161183a65c48d66142688/tenor.gif"
      );

      
    message.member.voice.channel.join().then((connection) => {
      require("http").get("http://199.168.188.202:9310/;", (res) => {
        connection.play(res);
        message.channel.send(embed);
      });
    });
    radios.set(message.guild.id, {
      name: "Anime Radio",
      url,
      textChannel: message.channel,
      radioEmbed,
    });

  },
};
