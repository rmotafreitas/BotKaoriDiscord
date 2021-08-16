const { Client, Message, MessageEmbed } = require("discord.js");
const embeds = require("../../tools/embeds").embeds;
module.exports = {
  name: "report",
  cooldown: 1000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const bug = args.join(" ");
    const Embeds = await embeds();
    if (!bug)
      return message.inlineReply(
        Embeds.error("You need to write the bug that you found 👀")
      );
    const emebedBug = new MessageEmbed()
      .setTitle("Bug encontrado!")
      .setDescription(bug)
      .setColor(`RANDOM`)
      .setFooter(
        `De: ${message.author.tag}`,
        message.author.displayAvatarURL()
      );
    client.users.cache.get("513113161126248469").send(emebedBug);
    return message.inlineReply(
      Embeds.completed(`__Bug reported to my Developer__\n>${bug}`)
    );
  },
};
