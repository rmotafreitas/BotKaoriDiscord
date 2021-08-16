const { Client, Message, MessageEmbed } = require("discord.js");
const NintedoFC = require("../../tools/classes/NintendoFC").NintedoFC;
const getUser = require("../../tools/getUSer").getUser;

module.exports = {
  name: "swcode",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = await getUser(client, message, args);
    const NintedoProfile = new NintedoFC(user.id);
    await NintedoProfile.init();
    const FcEmbed = new MessageEmbed()
      .setTimestamp()
      .setFooter("Nintedo")
      .setColor("2F3136")
      .setAuthor(
        user.username,
        user.displayAvatarURL({
          dynamic: false,
        })
      )
      .setTitle("Nintedo Switch Code")
      .setDescription(
        NintedoProfile.swFC != null
          ? NintedoProfile.swFC
          : user.id == message.author.id
          ? "You don't have a Sw Code\n" +
            "If you want to set up one: `" +
            client.prefix +
            "set-sw`"
          : "This person dosen't have a Sw Code"
      );
    return message.inlineReply(FcEmbed);
  },
};
