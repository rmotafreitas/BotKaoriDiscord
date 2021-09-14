const { Client, Message, MessageEmbed } = require('discord.js');
const colors = require("./../../json/colors.json");
module.exports = {
    name: 'skin',
    cooldown: 1000,
    category: "Games",
    usage: "skin [Minecraft skin name]",
    description: "Search a minecraft skin",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const nick = args[0];

        if (!nick)
          return message.inlineReply(
            `${message.author}, You need to give me a name for, I search the skin`);
    
    
        let embed = new MessageEmbed()
          .setTitle(`Nick: ${nick}`)
          .setImage(`https://mc-heads.net/body/${nick}/300`)
          .setColor(colors.blue);
    
        message.channel.send(embed)
    }
}