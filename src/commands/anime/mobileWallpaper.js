const HMfull = require("hmfull");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
    const wallpaper = await HMfull.HMtai.sfw.mobileWallpaper()

    const baguetteEmbed = new Discord.MessageEmbed()
        .setColor('#03A6ED')
        .setTitle(`Mobile wallpaper! 📱`)
        .setDescription(`[Download](${wallpaper.url})`)
        .setImage(wallpaper.url)
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 4096, dynamic: true }))
        .setTimestamp();
    
    return msg.channel.send(baguetteEmbed);
};

module.exports = {
  name: "mobilewallpaper",
  help: "Give a anime wallpaper to you use on your mobile phone",
  section: "🉐 Anime",
  usage: "mobileWallpaper",
  example: "mobilewallpaper",
  aliases: ['mewallpaper'],
  execute,
};