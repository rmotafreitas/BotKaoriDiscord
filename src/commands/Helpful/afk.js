const afks = require("../../models/afk.js");
const execute = async (bot, msg, args) => {
    let afk = await afks.findOne({
        userID: msg.author.id,
        guildID: msg.guild.id
    })
    if (afk) afk.delete()
    let newAfk = new afks({
        userID: msg.author.id,
        guildID: msg.member.guild.id,
        nickname: msg.member.nickname,
        afk: args.join(" "),
        time: Date.now()
    })
    newAfk.save();
    msg.channel.send(`<a:GreenOk:809876746672668673> | ${msg.author} I seted your Afk!`)
};

module.exports = {
  name: "afk",
  help: "Set an afk, so when someone pings you, they will know why are you Afk",
  section: "⚙️ HelpFul",
  usage: "afk [Why will you be afk]",
  example: "afk I will sleep",
  execute,
};