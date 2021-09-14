const { Client, Message, MessageEmbed } = require("discord.js");
const { embed } = require('../../tools/classes/fastEmbed');

module.exports = {
  name: "report",
  cooldown: 1000,
  category : 'Bot',
  usage: "report [Your bug]",
  description : 'Report a but to my developer',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const bug = args.join(" ");
    if (!bug)
      return message.inlineReply(
        embed.error("You need to write the bug that you found 👀")
      );
    const emebedBug = new MessageEmbed()
      .setTitle("Bug encontrado!")
      .setFooter(message.author.id)
      .setTimestamp()
      .setDescription(bug)
      .setColor(`RED`)
      .setFooter(
        `De: ${message.author.tag}`,
        message.author.displayAvatarURL()
      );
    client.users.cache.get("513113161126248469").send(emebedBug);
    return message.inlineReply(
      embed.completed(`__Bug reported to my Developer__\n>${bug}`)
    );
  },
};
