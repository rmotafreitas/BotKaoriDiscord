const { Client, Message, MessageEmbed } = require("discord.js");
const NintedoFC = require("../../tools/classes/NintendoFC").NintedoFC;
const { embed } = require('../../tools/classes/fastEmbed');

module.exports = {
  name: "set-sw",
  category: "Nintendo",
  cooldown: 2000,
  description: "Setup your Nintendo Switch friend-code",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    function isValid(code) {
      if (!code) return false;
      const CodeSplited = code.split("-");
      for (i = 0; i < CodeSplited.length; i++) {
        if (isNaN(CodeSplited[i])) return false;
      }
      return true;
    }

    const NintedoProfile = new NintedoFC(message.author.id);
    await NintedoProfile.init();
    const code = args[0];
    if (!isValid(code)) {
      return message.inlineReply( 
        embed.error("You need to input like this: `xxxx-xxxx-xxxx`")
      );
    } else {
      await NintedoProfile.setswFC(code);
      return message.inlineReply(embed.completed("Now your Nintendo Switch code is:\n`" + code + "`"));
    }
  },
};
