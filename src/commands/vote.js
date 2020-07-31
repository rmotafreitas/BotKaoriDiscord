const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const execute = async (bot, msg, args) => {
  let quest = args.join(" ");

  let tutorial = [
    "<a:Accept:719710630881525881> - Para votar sim!",
    "<a:Denided:719710607405875321> - Para votar não!",
  ];

  let Embed = new MessageEmbed()
    .setAuthor(
      msg.author.tag,
      msg.author.displayAvatarURL({ size: 4096, dynamic: true })
    )
    .setTitle(`Iniciou uma votação:`)
    .setDescription(quest)
    .setColor(`RANDOM`)
    .addFields({ name: "Como votar:", value: tutorial });
  msg.delete().catch((O_o) => {});
  msg.channel.send(Embed).then((sentEmbed) => {
    sentEmbed.react("719710630881525881");
    sentEmbed.react("730729650296193044");
  });
};

module.exports = {
  name: "vote",
  help: "Ele inicia uma votação!",
  execute,
};
