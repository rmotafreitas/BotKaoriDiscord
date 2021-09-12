const { Client, Message, MessageEmbed } = require('discord.js');
const minesweeperGame = require('../../tools/classes/minesweeper').minesweeper;

module.exports = {
    name: 'minesweeper',
    cooldown: 5*60*1000,
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        const Game = new minesweeperGame();
        Game.newGame(message);
    }
}