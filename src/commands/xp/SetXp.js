const firebase = require("firebase");
const database = firebase.database();
const { MessageEmbed } = require("discord.js");
const colors = require("../../colors.json");

const execute = async (bot, msg, args) => {
  if (!msg.member.permissions.has("MANAGE_GUILD"))
    return msg.reply(
      "you are weak, you do not have permission to `MANAGE_GUILDs` to use this command"
    );

  msg.reply(
    "\n**So to turn On the Xp system you need to mention a channel to I send the lvl up msg**\n**Pls type: [Example: `#general`]**"
  );
  var cha;
  // in your message event, and a command
  const filter = (m) => m.author.id === msg.author.id;

  msg.channel
    .awaitMessages(filter, {
      max: 1, // leave this the same
      time: 10000, // time in MS. there are 1000 MS in a second
    })
    .then(async (collected) => {
      if (collected.first().content == "cancel") {
        msg.reply("Command cancelled.");
      }
      cha = collected.first().content;
      cha = cha.substring(0, cha.length - 1);
      cha = cha.substring(2);
      if (!bot.channels.cache.get(cha))
        return msg.reply("Pls mention a channel!");
      console.log("collected :" + cha);
      database.ref(`Servidores/Levels/${msg.guild.id}/Config`).update({
        systemXp: "on",
        channelXp: cha,
      });
      let Embed = new MessageEmbed()
        .setColor(colors.white)

        .setDescription(
          `<a:verify:730845705018802176> | **Xp System Turned On!**\nI will send level up messages on <#${cha}>!`
        );
      msg.channel.send(Embed);
      Embed = new MessageEmbed()
        .setColor(colors.white)
        .setDescription(
          `<a:verify:730845705018802176> | **Xp System Turned On!**\nI will send level up messages on this channel!`
        );
      bot.channels.cache.get(cha).send(Embed);
    })

    .catch((err) => {
      // what to do if a user takes too long goes here
      console.log(err);
      return msg.reply("You took too long! Goodbye!");
    });
};

module.exports = {
  name: "ConfigXp",
  helpConfig: "Config the Xp system",
  execute,
};
