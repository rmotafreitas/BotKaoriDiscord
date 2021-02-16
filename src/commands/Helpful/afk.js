const afks = require("../../models/afk.js");
const execute = async (bot, msg, args) => {
    let newAfk = new afks({
        userID: msg.author.id,
        guildID: msg.member.guild.id,
        nickname: msg.member.nickname ? msg.member.nickname : msg.author.username,
        afk: args.join(" "),
        time: Date.now()
    })
    newAfk.save();
    msg.channel.send(`<a:GreenOk:809876746672668673> | ${msg.author} I seted your Afk!`).then((msg) => msg.delete({ timeout: 3500 }));
};

module.exports = {
  name: "afk",
  help: "Set an afk, so when someone pings you, they will know why are you Afk",
  section: "⚙️ HelpFul",
  usage: "afk [Why will you be afk]",
  example: "afk I will sleep",
  execute,
};