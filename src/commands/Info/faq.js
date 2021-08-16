const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "faq",
  aliases: ["work", "bal", "waifu", "w"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const Ness = client.users.cache.get("513113161126248469");

    const faqEmbed = new MessageEmbed()
      .setAuthor(`${Ness.username} [Dev]`, Ness.displayAvatarURL())
      .setColor("BLUE")
      .addField(
        ":flag_us: Kaori?",
        "I'm redoing kaori's commands, adding new features. And a completely new economy system. If you find any bugs, please use the report command, if you do you will be rewarded in the next update."
      )
      .addField(
        ":flag_pt: Kaori?",
        "Eu estou a refazer os comandos da kaori, acresentadno coisas novas. E um sistema completamente novo de economia. Se tu encontrares algum bug, por favor usa o comando report, se o fizeres irás ser recompensado na proxima atualização."
      );
    message.inlineReply(faqEmbed);
  },
};
