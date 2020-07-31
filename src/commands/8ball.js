const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let responses = [
    "Sim",
    "Não",
    "Mas é claro",
    "Absolutamente que sim!",
    "Claro que não",
    "Talvez",
    "Não responderei isso agora",
    "Esqueça isso",
    "Vc é mal informado",
  ];
  let response = responses[Math.floor(Math.random() * responses.length)];
  let pergunta = args.join(" ");
  let Embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(
      msg.author.tag,
      msg.author.displayAvatarURL({ size: 4096, dynamic: true })
    )
    .setTitle("Perguntou:")
    .setDescription(pergunta)
    .addFields({ name: "Resposta:", value: response });
  msg.delete().catch((O_o) => {});
  msg.channel.send(Embed);
};

module.exports = {
  name: "8ball",
  help: "Responde uma pergunta?",
  execute,
};
