const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let user;
  if (msg.mentions.users.first()) {
    user = msg.mentions.users.first();
  } else if (args[0]) {
    user = msg.guild.members.cache.get(args[0]).user;
  } else {
    user = msg.author;
  }

  let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
  let Embed = new MessageEmbed()
    .setImage(avatar)
    .setTitle("Baixar")
    .setURL(avatar);
  msg.channel.send(Embed);
};

module.exports = {
  name: "avatar",
  help: "Ele mostra o avatar!",
  execute,
};
