const { Client, Message, MessageEmbed } = require('discord.js');
const embeds = require("../../tools/embeds").embeds;
const prefixs = require("../../models/prefixs");
module.exports = {
    name: 'setpreix',
    cooldown: 1000,
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        const Embeds = await embeds();
        const newPrefix = args[0];
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.inlineReply(Embeds.error("You need to have the `MANAGE_GUILD` permission."));
        }
        if (!newPrefix) {
            return message.inlineReply(Embeds.error("You need to input a new prefix in the command."));
        }
        let guild = await prefixs.findOne({
            guildID: message.guild.id,
        });
        guild.prefix = newPrefix;
        guild.save().catch((err) => console.log(err));
        return message.inlineReply(Embeds.completed("My new prefix for this guild is `" + newPrefix + "`"));
    }
}