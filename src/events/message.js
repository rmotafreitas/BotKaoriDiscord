const { client } = require("../../src/index");
const { Collection } = require("discord.js");
const getPrefix = require("../tools/getPrefix").getPrefix;
const Timeout = new Collection();
const ms = require("ms");
client.on("message", async (message) => {
    if (message.author.bot) return;
    const prefix = await getPrefix(message.guild.id);
    client.prefix = prefix;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
      if (command.nsfw && !message.channel.nsfw)
        return message.inlineReply("This channel is not nsfw");
      if (command.cooldown) {
        if (Timeout.has(`${command.name}${message.author.id}`))
          return message.channel.send(
            `You are on a \`${ms(
              Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
              { long: true }
            )}\` cooldown.`
          );
        command.run(client, message, args);
        Timeout.set(
          `${command.name}${message.author.id}`,
          Date.now() + command.cooldown
        );
        setTimeout(() => {
          Timeout.delete(`${command.name}${message.author.id}`);
        }, command.cooldown);
      } else command.run(client, message, args);
    }
});
