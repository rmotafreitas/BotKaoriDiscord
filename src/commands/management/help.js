const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let help = "";

  help += "🌞 **Anime**\n";
  bot.commands.forEach((command) => {
    if (command.helpAnime) {
      help += "> `" + process.env.PREFIX + command.name + "`" + ":" + " " + command.helpAnime + "\n";
    }
  });

  help += "💸 **Economy**\n";
  bot.commands.forEach((command) => {
    if (command.helpEconomy) {
      help += "> `" + process.env.PREFIX + command.name + "`" + ":" + " " + command.helpEconomy + "\n";
    }
  });

  help += "🔧 **Management**\n";
  bot.commands.forEach((command) => {
    if (command.helpManagement) {
      help += "> `" + process.env.PREFIX + command.name + "`" + ":" + " " + command.helpManagement + "\n";
    }
  });

  help += "🎵 **Music**\n";
  bot.commands.forEach((command) => {
    if (command.helpMusic) {
      help += "> `" + process.env.PREFIX + command.name + "`" + ":" + " " + command.helpMusic + "\n";
    }
  });

  help += "⚙️ **Config**\n";
  bot.commands.forEach((command) => {
    if (command.helpConfig) {
      help += "> `" + process.env.PREFIX + command.name + "`" + ":" + " " + command.helpConfig + "\n";
    }
  });

  help += "😆 **Fun**\n";
  bot.commands.forEach((command) => {
    if (command.helpFun) {
      help += "> `" + process.env.PREFIX + command.name + "`" + ":" + " " + command.helpFun + "\n";
    }
  });

  help += "⠀";

  var kaori = bot.users.cache.get("730092279326441574");
  let kaoriavatar = kaori.displayAvatarURL({ size: 4096, dynamic: true });
  var dev = bot.users.cache.get("513113161126248469");
  let devavatar = dev.displayAvatarURL({ size: 4096, dynamic: true });
  let Emebed = new MessageEmbed()
    .setAuthor("Kaori Miyazono#5192", kaoriavatar)
    .setColor("RANDOM")
    .setTitle("Help")
    .setDescription(help)
    .setFooter(`Dev: ${dev.username}#${dev.discriminator}`, devavatar);
  return msg.channel.send(Emebed);
};

module.exports = {
  name: "help",
  helpManagement: "Show help",
  execute,
};
