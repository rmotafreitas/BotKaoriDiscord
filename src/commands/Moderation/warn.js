// MODELS
const punishments = require("../../models/ModWarn.js");

const Discord = require("discord.js");

const execute = async (bot, msg, args) => {
  const userToWarn = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])

  if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
    return msg.reply("You are not allowed to warn members!")
}

if(msg.author.id === userToWarn.id) return msg.reply("You can't warn yourself");

let reason = args.slice(1).join(" ")

if(!reason) return msg.channel.send('No reason specified!')

let data = await punishments.findOne({
    guildID: msg.guild.id,
    userID: userToWarn.id
});

if(data) {
    data.Punishments.unshift({
        PunishType: 'Warn',
        ModeratorId: msg.author.id,
        ModeratorName: msg.author.username,
        Reason: reason,
    });
    data.save();

    msg.channel.send(`warned ${userToWarn} for \`${reason}\``)
} else if (!data) {
    let newData = new punishments({
        guildID: msg.guild.id,
        userID: userToWarn.id,
        Punishments: [{
            PunishType: 'Warn',
            ModeratorId: msg.author.id,
            ModeratorName: msg.author.username,
            Date: Date.now(),
            Reason: reason,
        }, ],
    });
    newData.save();

    msg.channel.send(`Warned ${userToWarn} for \`${reason}\``)

    bot.users.cache.get(userToWarn.id).send(`You got a warn, Baka!\n**❯ Server:** ${userToWarn.guild.name}\n**❯ Reason:** ${reason}`);
}

};

module.exports = {
  name: "warn",
  help: "Warns an user about something he did",
  section: "👮‍♀️ Moderation",
  usage: "warn [@mention] [What they did wrong]",
  example: `warn @mention You send nsfw content to general!`,
  execute,
};