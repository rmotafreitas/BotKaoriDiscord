const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let responses = [
    "Yes",
    "No",
    "Of course",
    "Absolutely yes!",
    "Of course not",
    "Maybe",
    "I will not answer that now!",
    "Forget that",
    "I don't know answer",
  ];
  let response = responses[Math.floor(Math.random() * responses.length)];
  let pergunta = args.join(" ");
  let Embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(
      msg.author.tag,
      msg.author.displayAvatarURL({ size: 4096, dynamic: true })
    )
    .setTitle("Asked:")
    .setDescription(pergunta)
    .addFields({ name: "Answer:", value: response });
  msg.delete().catch((O_o) => {});
  msg.channel.send(Embed);
  
};

module.exports = {
  name: "8ball",
  helpFun: "Answer your questions!",
  execute,
};
