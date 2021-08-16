const { MessageEmbed } = require("discord.js");
const { client } = require("../index.js");
const getPrefix = require("../tools/getPrefix").getPrefix;
// message
/* Emitted whenever a message is created.
PARAMETER      TYPE           DESCRIPTION
message        Message        The created message    */
client.on("message", async (message) => {
  const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);

  if (!message.guild || message.author.bot) return;

  if (message.content.match(mentionRegex)) {
    const prefix = await getPrefix(message.guild.id);
    const prefix1 = new MessageEmbed()
      .setTitle(`My prefix is \`\`\`${prefix}\`\`\``)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setDescription(`**For more info**\n ➡️ ${prefix}help to list commands\n`)

      .setTimestamp()

      .setColor("#34ebe5");
    return message.inlineReply(prefix1);
  }
});
