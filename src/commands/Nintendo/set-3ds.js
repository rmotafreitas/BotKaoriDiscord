const { Client, Message, MessageEmbed } = require("discord.js");
const NintedoFC = require("../../tools/classes/NintendoFC").NintedoFC;
const embeds = require("../../tools/embeds").embeds;

module.exports = {
  name: "set-3ds",
  cooldown: 0,
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
    const Embeds = await embeds();
    if (!isValid(code)) {
      return message.inlineReply( 
        await Embeds.error("You need to input like this: `xxxx-xxxx-xxxx`")
      );
    } else {
      await NintedoProfile.setndsFC(code);
      return message.inlineReply(await Embeds.completed("Now your Ninetdo 3Ds code is:\n`" + code + "`"));
    }
  },
};
