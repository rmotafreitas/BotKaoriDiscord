const { DiscordTogether } = require('discord-together');
const { client } = require('../index');
const discordTogether = new DiscordTogether(client);

module.exports = { 
    discordTogether
};