const { Client, Message, MessageEmbed } = require('discord.js');
const watchlists = require("../../models/watchlist");

module.exports = {
    name: 'reset-list',
    cooldown: 2,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let data = await watchlists.findOne({
            userID: message.author.id,
        });

        data.watching = [];
        data.completed = [];
        data.onHold = [];
        data.dropped = [];
        data.toWatch = [];

        data.save();

        message.inlineReply("Watch List reseted!");
      
    }
}