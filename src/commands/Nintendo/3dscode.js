const { Client, Message, MessageEmbed } = require("discord.js");
const NintedoFC = require("../../tools/classes/NintendoFC").NintedoFC;
const getUser = require("../../tools/getUSer").getUser;

module.exports = {
  name: "3dscode",
  category: "Nintendo",
  cooldown: 2000,
  description: "Get a nintendo 3ds Friend-Code from a mentioned user",
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
      .setTitle("Nintedo 3Ds Code")
      .setDescription(
        NintedoProfile.ndsFC != null
          ? NintedoProfile.ndsFC
          : user.id == message.author.id
          ? "You don't have a 3Ds Code\n" +
            "If you want to set up one: `" +
            client.prefix +
            "set-3ds`"
          : "This person dosen't have a 3Ds Code"
      );
    return message.inlineReply(FcEmbed);
  },
};
