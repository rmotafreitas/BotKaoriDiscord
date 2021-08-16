const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'watch-yt',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
            return message.channel.send(`${invite.code}`);
        });
        
    }
}