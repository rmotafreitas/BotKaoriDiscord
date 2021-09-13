const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");
module.exports = {
  name: "Bot",
  category : 'Bot',
  description : 'Get the bot invite link',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const dev = client.users.cache.get("513113161126248469");
    let Emebed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setColor("RANDOM")
      .setTitle("Invite!")
      .setDescription(
        `Thank you for invite me!\n💌 [Click here!](${`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`})`
      )
      .setFooter(`Dev: ${dev.username}#${dev.discriminator}`, dev.displayAvatarURL());
    return message.inlineReply(Emebed);
  },
};
