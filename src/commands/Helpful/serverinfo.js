const Discord = require("discord.js");
const level = ["None", "Low", "Medium", "High", "Max"];
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const colors = require("../../colors.json");
const execute = async (bot, msg, args) => {
  const emebed = new MessageEmbed()
    .setThumbnail(msg.guild.iconURL())
    .setColor(colors.blue)
    .setFooter(
        `• Author: ${msg.author.tag}`,
        msg.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )
    .setDescription(
      "**Server**\n" +
        `**❯ Name: **${msg.guild.name}\n` +
        //!`**❯ Owner: **${msg.guild.owner.user.tag}\n` +
        `**❯ ID: **${msg.guild.id}\n` +
        `**❯ Picture: **[Download](${msg.guild.iconURL({
          dynamic: true,
          format: "png",
        })})\n`+
        `**❯ Members: **${msg.guild.memberCount}\n`+
        `**❯ Roles: **${msg.guild.roles.cache.size}\n`+
        `**❯ Created at: **${moment.utc(msg.guild.createdAt).format("dddd, MMMM, Do, YYYY")}\n`
    );
    console.log(msg.guild);
  return msg.channel.send(emebed);
};

module.exports = {
  name: "serverinfo",
  help: "Show the info of the server",
  section: "⚙️ HelpFul",
  usage: "serverinfo",
  example: "serverinfo",
  aliases: ['svinfo', 'si'],
  execute,
};
