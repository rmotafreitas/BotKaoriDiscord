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
        if (!message.member.voice.channel) {
            return message.inlineReply("You need to be in a voice chat, in order to watch youtube with your friends!");
        }
        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
            return message.channel.send(`${invite.code}`);
        });
        
    }
}