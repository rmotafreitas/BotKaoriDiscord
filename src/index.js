const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

//? Events
const ready = require("../src/events/ready").ready;
const message = require("../src/events/message").message;
const guildMemberAdd = require("../src/events/guildMemberAdd").guildMemberAdd;
const guildCreate = require("../src/events/guildCreate").guildCreate;
const guildDelete = require("../src/events/guildDelete").guildDelete;

//? Config
dotenv.config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();

//? Command handler
const commandsFolder = fs.readdirSync(path.join(__dirname, "/commands"));

for (var folder of commandsFolder) {
  const files = fs
    .readdirSync(path.join(__dirname, "/commands", folder))
    .filter((filename) => /^.*\.(t|j)s$/.test(filename));
  for (var filename of files) {
    const command = require(`./commands/${folder}/${filename}`);
    bot.commands.set(command.name, command);
  }
}

bot.login(process.env.TOKEN);

bot.on("ready", function () {
  ready(bot);
});

bot.on("message", function (msg) {
  message(bot, msg);
});

bot.on("guildMemberAdd", async (member) => {
  guildMemberAdd(bot, member);
});

bot.on("guildCreate", (guild) => {
  guildCreate(bot, guild);
});

bot.on("guildDelete", (guild) => {
  guildDelete(bot, guild);
});