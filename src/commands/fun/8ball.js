const Discord = require("discord.js");
const HMfull = require("hmfull");
const { MessageEmbed } = require("discord.js");
const getHelp = require("../../tools/helpDoubt.js").helpDoubt;

const execute = async (bot, msg, args) => {
  if (!args[0]) {
    msg.reply("Hey, where is the question?")
    getHelp(msg, bot, "8ball");
    return;
  }
  let response = await HMfull.Nekos.ball8();
  let pergunta = args.join(" ");
  let Embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(
      msg.author.tag,
      msg.author.displayAvatarURL({ size: 4096, dynamic: true })
    )
    .setTitle("Asked:")
    .setDescription(`${pergunta}\n**Answer:**`)
    .setImage(response.url);
  msg.channel.send(Embed);
  
};

module.exports = {
  name: "8ball",
  section: "😆 Fun",
  help: "Answer your questions!",
  usage: "8ball [Your Question]",
  example: "8ball I should do the homework?",
  aliases: ['8b'],
  execute,
};
