const { Client, Message, MessageEmbed } = require('discord.js');
const { discordTogether } = require('../../client/DiscordTogether');

module.exports = {
    name: 'fish',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
           return message.inlineReply("You need to be in a voice chat, in order to play fishing!");
        }
        discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
            return message.channel.send(`${invite.code}`);
        });
        
    }
}