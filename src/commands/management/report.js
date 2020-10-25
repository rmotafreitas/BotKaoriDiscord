const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let bug = args.join(" ");
  let emebed = new MessageEmbed()
    .setTitle("Bug encontrado!")
    .setDescription(bug)
    .setColor(`RANDOM`)
    .setFooter(`De: ${msg.author.tag}`);
  bot.users.cache.get("513113161126248469").send(emebed);
};

module.exports = {
  name: "report",
  helpManagement: "Report bugs!",
  execute,
};
