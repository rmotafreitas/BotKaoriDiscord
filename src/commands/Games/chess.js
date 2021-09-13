const { Client, Message, MessageEmbed } = require('discord.js');
const { discordTogether } = require('../../client/DiscordTogether');

module.exports = {
    name: 'chess',
    cooldown: 1000,
    category: "Games",
    description: "Play chess in a voice call with your friends",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            return message.inlineReply("You need to be in a voice chat, in order to play chess with your friends!");
        }
        discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
            return message.channel.send(`${invite.code}`);
        });
        
    }
}