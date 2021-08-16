const { client } = require("../index");
const prefix = client.prefix;
const { Collection } = require("discord.js");
const Timeout = new Collection();
const ms = require("ms");
// messageUpdate
/* Emitted whenever a message is updated - e.g. embed or content change.
PARAMETER     TYPE           DESCRIPTION
oldMessage    Message        The message before the update
newMessage    Message        The message after the update    */
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  if (!newMessage.content.startsWith(prefix)) return;
  if (!newMessage.guild) return;
  const args = newMessage.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) {
    if (command.nsfw && !newMessage.channel.nsfw)
      return newMessage.inlineReply("This channel is not nsfw");
    if (command.cooldown) {
      if (Timeout.has(`${command.name}${newMessage.author.id}`))
        return newMessage.channel.send(
          `You are on a \`${ms(
            Timeout.get(`${command.name}${newMessage.author.id}`) - Date.now(),
            { long: true }
          )}\` cooldown.`
        );
      command.run(client, newMessage, args);
      Timeout.set(
        `${command.name}${newMessage.author.id}`,
        Date.now() + command.cooldown
      );
      setTimeout(() => {
        Timeout.delete(`${command.name}${newMessage.author.id}`);
      }, command.cooldown);
    } else command.run(client, newMessage, args);
  }
});
