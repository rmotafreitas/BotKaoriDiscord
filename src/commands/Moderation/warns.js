// MODELS
const punishments = require("../../models/ModWarn.js");
const moment = require("moment");
const Discord = require("discord.js");
const colors = require("../../colors.json");
const execute = async (bot, msg, args) => {
  if (!args[0]) {
    var user = msg.author;
  } else {
    var user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
  }
  let data = await punishments.findOne({
    guildID: msg.guild.id,
    userID: user.id,
  });
  const warnsEmbed = new Discord.MessageEmbed();

  if (data) {
    data = data.Punishments;
    for (const i in data) {
      warnsEmbed.addField(
        `Warn #${(parseInt(i) + 1).toString()}`,
        `**❯ Reason:** ${data[i].Reason}\n` +
          `**❯ Date:** ${moment(data.Date).format("LL LTS")}\n` +
          `**❯ Moderator:** ${data[i].ModeratorName} (${data[i].ModeratorId})`
      );
    }
    warnsEmbed
      .setColor(colors.red)
      .setAuthor(
        user.username,
        user.displayAvatarURL({ size: 4096, dynamic: true })
      )
      .setTitle("Warns:")
      .setThumbnail(user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setFooter(
        `• Author: ${msg.author.tag}`,
        msg.author.displayAvatarURL({ dynamic: false, size: 1024 })
      );
    return msg.channel.send(warnsEmbed);
  } else if (!data) {
    return msg.reply("There is no warns for that user");
  }
};

module.exports = {
  name: "warns",
  help: "View the list of warns of a mentioned user or you",
  section: "👮‍♀️ Moderation",
  usage: "warns <@mention>",
  example: `warns`,
  execute,
};
