const { Client, Message, MessageEmbed } = require('discord.js');
const koenie06games = require('koenie06-games');
const SnakeGame = new koenie06games.SnakeGame();

module.exports = {
    name: 'snake',
    cooldown: 3,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        SnakeGame.newGame(message);
    }
}