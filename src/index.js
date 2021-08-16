const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { Collection, Client, Discord, Message } = require("discord.js");
const client = new Client({
  disableMention: "everyone",
});
const { DiscordTogether } = require("discord-together");

require("./tools/ExtendedMessage");

const fs = require("fs");

const path = require("path");

const distube = require("distube");
const player = new distube(client);

module.exports = { client, player };
client.bumps = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve("src/commands"));
["command"].forEach((handler) => {
  require(path.resolve(`src/handlers/${handler}`))(client, player);
});
client.discordTogether = new DiscordTogether(client);
client.player = player;

client.login(process.env.token);

//? Connect to MongoDb
mongoose
  .connect(process.env.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDb Connected!"));
