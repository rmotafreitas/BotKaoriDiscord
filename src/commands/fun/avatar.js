const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let user = msg.mentions.users.first() || bot.users.cache.get(args[0]) || msg.author;
  
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
  
  let embed = new MessageEmbed() 
    .setColor(`#3399ff`) 
    .setTitle(`Avatar from: ${user.username}`) 
    .setDescription(`[Download ⬇️](${avatar})`)
    .setImage(avatar) 
    .setFooter(`• Author: ${msg.author.tag}`, msg.author.displayAvatarURL({dynamic: true, size: 1024}));
 await msg.channel.send(embed); 
};

module.exports = {
  name: "avatar",
  section: "😆 Fun",
  help: "Shows mentioned avatar or yours",
  usage: "avatar <@mention>",
  example: "avatar",
  execute,
};
