const firebase = require("firebase");
const database = firebase.database();
const { MessageEmbed } = require("discord.js");
const colors = require("../../colors.json");
const execute = async (bot, msg, args) => {
  if (!msg.member.permissions.has("MANAGE_GUILD"))
    return msg.reply(
      "you are weak, you do not have permission to `MANAGE_GUILDs` to use this command"
    );

  database.ref(`Servidores/Levels/${msg.guild.id}/Config`).update({
    systemXp: "off",
  });
  let Embed = new MessageEmbed()
    .setColor(colors.white)

    .setDescription(
      "<:pepe_sad_hug:761532762234421258> | **Xp System Turned Off!**\nTo turn on again use `$configXp`!"
    );
  msg.channel.send(Embed);
};

module.exports = {
  name: "turnoffxp",
  section: "🔧 Bot Config",
  help: "Turn Off Xp System",
  usage: "turnoffxp",
  example: "turnoffxp",
  execute,
};
