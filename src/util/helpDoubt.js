const { MessageEmbed } = require("discord.js");
const helpDoubt = async (msg , bot, command) => {
  if(!bot.commands.get(command)) return msg.reply("That command does not exist");
  command = bot.commands.get(command);
  var kaori = bot.users.cache.get(bot.user.id);
  let kaoriavatar = kaori.displayAvatarURL({ size: 4096, dynamic: true });
  var dev = bot.users.cache.get("513113161126248469");
  let devavatar = dev.displayAvatarURL({ size: 4096, dynamic: true });
  let Emebed = new MessageEmbed()
    .setAuthor(`Help ${command.name}`, kaoriavatar)
    .setColor("RANDOM")
    .setDescription(`**❯ Section:** ${command.section}\n` +
    `**❯ Name:** ${command.name}\n` +
    `**❯ Help:** ${command.help}\n` +
    `**❯ Usage:** ${command.usage}`)
    .setFooter(`Dev: ${dev.username}#${dev.discriminator}`, devavatar)
    .setTimestamp();
  return msg.channel.send(Emebed);
};

module.exports = {
  helpDoubt,
};