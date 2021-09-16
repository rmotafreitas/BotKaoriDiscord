const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require("../json/colors.json");
const { radios } = require('../Collection');

module.exports = {
  name: "pt",
  fullname: "RFM",
  emoji: "<:RFM:888101461668532224>",
  description: "RFM is a Portuguese radio station, which is the most listened to in Portugal",
  link: "https://rfm.sapo.pt",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.voice.channel) return message.inlineReply("You need to be on a voice channel");

    const embed = new MessageEmbed()
      .setTitle("Playing Portuguese Radio!")
      .setColor(colors.red)
      .setDescription(
          `📝 __Text Channel:__ ${message.channel}\n` +
          "🔊 __Voice Channel:__ " +
          "`" +
          message.member.voice.channel.name +
          "`\n" + 
          `\n • Só grandes músicas!`
      )
      .setThumbnail("https://images.rfm.sapo.pt/img_rfm_partilha29260980.jpg")
      .setTimestamp()
      .setFooter(
        `Session started by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      );
    message.member.voice.channel.join().then((connection) => {
      require("https").get("https://20073.live.streamtheworld.com/RFMAAC_SC?DIST=TuneIn&TGT=TuneIn&maxServers=2&gdpr=1&us_privacy=1YNY&gdpr_consent=CPKobYkPKobYkAcABBENBmCsAP_AAAAAACiQIJgAAAIEAABAAGBhAIsAAAAAAAAAACAQAAAAAAAAABgAAAAAAAAAAAAAACAAAAgAIAAAAAAAAAAABAAAAAAAAADAAAAAAAEAAABAAAAAAAAAAAAAAIAAAAAAAAAQAAAAgAwAPv____f_r-3_3__5_X---_e_V399zLv9_____9nN___9gAAASCQGwAMgAgABpAEQARQAmAClAHeAkQBeYDDQGHgMiAZIAycBlwDOQGfANIAadA1gDWQG6wORA5UBy4DowHWAPHAfKEALgMQAYsAyEBkYDJgGhANGAaUA1MBtADbgG6AOCAdIA7AB2YDugHgQPJA8oB7QD3QHyAPsDQDAEVAJEAYeAxgBk4DOQGeAM-AckA5QB1gD8AwAYBkYDQgG6AOJAdmA90RAJASIAw8Bk4DOQGfAOSAcoA6wB-AgAKA0IBugDiQHZgPdFQDAAmAKbAXmAw8BkQDOQGeAM-AbkA5IBygD8BQAQBoQDXgHEgPsGQCwAmALzAYeAyIBnIDPAGfAOSAcoA-IB-AwAGA0IBxID7B0C0ADIAIAAaQBEAEUAJgAXwAxAClAHeARYAuoCKgEiALzAYaAw8BiQDGAGPAMkAZOAyoBlgDLgGcgM-AaJA0gDSQGlgNOAaqA1gBsYDdQHFwOSA5UBy4DowHWAPHAekA9UB8oD6wH4DgDgA7gGIAMWAZCAyYBl4DQoGigaMA0oBpoDUwGvANoAbYA24BxMDjwOQAdIA7AB2YDwIHkgeUA9oB7oD4gH2APxAfsQgLgAZACYAF8AMQA7wEiAMPAYkAyIBk4DOQGeAM-AaIA0kBpYDVQHAAOSAdGA6wB44D8CAA4BoQDRQGlANTAbYA24BxIDsIHkgeUA9EB7oD4gH2AP2JQFwAMgBEACYAF8AMQApQB3gF1ARUAkQBeYDDwGRAMnAZYAzkBngDPgGkANYAcAA6wB-BIAWAO4BiwDQgGlANyAcSA6QB2ADygHtAPsKQIQAMgAgABpAEQARQAmABSAC-AGIAUoA7wCLAJEAXmAw0Bh4DGAGRAMkAZOAy4BnIDPAGfQNIA0mBrAGsgNjAbrA5MDlAHLgOsAeOA-UB-BQAoAO4AuoDFgGTANCAaIA0oBpsDUgNTAa8A4IBxIDsAHZgPKAe0A90B8QD7AH7A.f_gAAAAAAAAA&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTYyODQ0OTk2MywiaXNzIjoidGlzcnYifQ.aiZKY7Pd_wuwapfXYRe1HLPKqWWccIuxrXxcM6NiqPA", (res) => {
        connection.play(res);
        message.channel.send(embed);
      });
    });

    const radioEmbed = new MessageEmbed()
    .setTitle("Playing Rfm!")
    .setColor(colors.red)
    .setDescription(
        `📝 __Text Channel:__ ${message.channel}\n`
    )//
    .setTimestamp()
    .setFooter(
      `Session started by: ${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true, size: 1024 })
    )
    .setThumbnail("https://images.rfm.sapo.pt/img_rfm_partilha29260980.jpg");

    radios.set(message.guild.id, {
      name: "Rfm Radio",
      textChannel: message.channel,
      radioEmbed
    });
    
  },
};
