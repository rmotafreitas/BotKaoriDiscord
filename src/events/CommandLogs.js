const { client } = require("../index.js");
const getPrefix = require("../tools/getPrefix").getPrefix;
const { Client, Message, MessageEmbed } = require("discord.js");

client.on("message", async (message) => {
  if (message.author.bot) return;
  const prefix = await getPrefix(message.guild.id);
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) {
    const LogEmbed = new MessageEmbed()
        .setTimestamp()
        .setColor("BLUE")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setFooter(message.guild.name, message.guild.iconURL())
        .setDescription(message.content);
    const channel = client.channels.cache.get("771007139598172191");
    channel.send(LogEmbed);
  }
});
