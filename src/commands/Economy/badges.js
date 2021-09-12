const { Client, Message, MessageEmbed } = require('discord.js');
const badges = require("../../json/emojis.json");

module.exports = {
    name: 'badges',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTimestamp()
            .setFooter("Kaori badges guide")
            .setTitle("How to win badges?")
            .setDescription(`${badges.BugHunter} - Report a bug to the dev. ${'`'}${client.prefix}report${'`'}\n` + 
            `${badges.DeveloperBadge} - Only my developer has this badge\n` +
            `${badges.FanartBadge} - Do a fanart to me\n` +
            `${badges.KaoriModBadge} - My mod's have this badge\n` +
            `${badges.MarryBadge} - You have this badge if you are married\n` +
            `${badges.PremiumBadge} - Buy kaori premium\n` +
            `${badges.SnakeBadge} - Have the top snake score`);
        message.inlineReply(embed);
    }
}