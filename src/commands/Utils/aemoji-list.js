const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'aemoji-list',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let emojiNumber = 0;
        client.guilds.cache.forEach(async (guild) => {
            emojiNumber += guild.emojis.cache.filter(emoji => emoji.animated).size;    
        })
        let animatedEmojis  = [];
        client.guilds.cache.forEach(async (guild) => {
            guild.emojis.cache.forEach(async (emoji) => {
                if (emoji.animated) animatedEmojis.push(emoji);
            })  
        })
        let page = args[0] || 1;
        let desc = "";
        for (i = 0; i < 15; i++) {
            desc += `${animatedEmojis[(15*page)+i]} = ${animatedEmojis[(15*page)+i].name}\n`
        }
        const embed = new MessageEmbed()
            .setFooter(`Page ${page} / ${Math.floor(animatedEmojis.length/15)-1}`)
            .setColor("BLUE")
            .setTimestamp()
            .setDescription(desc);
        message.channel.send(embed);
    }
}