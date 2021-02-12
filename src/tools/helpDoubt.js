const { MessageEmbed } = require("discord.js");
const helpDoubt = async (msg, bot, command) => {
  const cmdName = command.toLowerCase();
  command =
    bot.commands.get(cmdName) ||
    bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmdName));
  if (!command) return msg.reply("That command does not exist");
  var kaori = bot.users.cache.get(bot.user.id);
  let kaoriavatar = kaori.displayAvatarURL({ size: 4096, dynamic: true });
  var dev = bot.users.cache.get("513113161126248469");
  let devavatar = dev.displayAvatarURL({ size: 4096, dynamic: true });
  let Emebed = new MessageEmbed()
    .setAuthor(`Help ${command.name}`, kaoriavatar)
    .setColor("RANDOM")
    .setDescription(
      `**❯ Section:** ${command.section}\n` +
        `**❯ Name:** ${command.name}\n` +
        `**❯ Help:** ${command.help}\n` +
        `**❯ Usage:** ${command.usage}\n` +
        `**❯ Example:** ${command.example}\n` +
        `**❯ Aliases:** ${
          command.aliases ? command.aliases : "No Aliases for this command"
        }`
    )
    .setFooter(`Dev: ${dev.username}#${dev.discriminator}`, devavatar)
    .setTimestamp();
  return msg.channel.send(Emebed);
};

module.exports = {
  helpDoubt,
};
