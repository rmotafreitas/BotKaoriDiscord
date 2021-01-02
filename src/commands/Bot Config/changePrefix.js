const firebase = require("firebase");
const database = firebase.database();
const { MessageEmbed } = require("discord.js");
const colors = require("../../colors.json");
const getHelp = require("../../util/helpDoubt.js").helpDoubt;
const execute = async (bot, msg, args) => {
  if (!msg.member.permissions.has("MANAGE_GUILD"))
    return msg.reply(
      "you are weak, you do not have permission to `MANAGE_GUILDs` to use this command"
    );

  if (!args[0]) {
    msg.reply("Hey you forgot to say what is the new Prefix");
    getHelp(msg, bot, "prefix");
    return;
  }

  const prefix = args[0];

  database.ref(`Servidores/Levels/${msg.guild.id}/Config`).update({
    prefix: prefix,
  });
  let Embed = new MessageEmbed()
    .setColor(colors.white)

    .setDescription(`Prefix update: ${prefix}`);
  msg.channel.send(Embed);
};

module.exports = {
  name: "prefix",
  section: "🔧 Bot Config",
  help: "Change Bot Prefix",
  usage: "prefix New Prefix",
  execute,
};
