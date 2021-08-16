const { Client, Message, MessageEmbed } = require('discord.js');
const SnakeGame = require('../../tools/classes/snake').SnakeGame;
const Game = new SnakeGame();

module.exports = {
    name: 'snake',
    cooldown: 3,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        Game.newGame(message);
    }
}