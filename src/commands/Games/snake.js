const { Client, Message, MessageEmbed } = require('discord.js');
const SnakeGame = require('../../tools/classes/snake').SnakeGame;
const Game = new SnakeGame();

module.exports = {
    name: 'snake',
    cooldown: 5*60*1000,
    category: "Games",
    description: "Play snake on discord",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        Game.newGame(message);
    }
}