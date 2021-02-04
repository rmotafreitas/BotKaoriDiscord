const HMfull = require("hmfull");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
    const baguette = await HMfull.Freaker.sfw.baguette()

    const baguetteEmbed = new Discord.MessageEmbed()
        .setColor('#FC8F1B')
        .setTitle('Baguette! 🥖')
        .setImage(baguette.url)
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 4096, dynamic: true }))
        .setTimestamp();
    
    return msg.channel.send(baguetteEmbed);
};

module.exports = {
  name: "baguette",
  section: "🉐 Anime",
  help: "Show an anime pic with a baguette xD",
  usage: "baguette",
  example: "baguette",
  execute,
};