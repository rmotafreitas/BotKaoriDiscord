const { Client, Message, MessageEmbed } = require('discord.js');
const { discordTogether } = require('../../client/DiscordTogether');

module.exports = {
    name: 'poker',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            return message.inlineReply("You need to be in a voice chat, in order to play poker with your friends!");
        }
        discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
            return message.channel.send(`${invite.code}`);
        });
        
    }
}