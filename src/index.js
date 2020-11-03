const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const firebase = require("firebase");


//? Connect to dbs
// Your web app's Firebase configuration
var configF = {
  apiKey: process.env.fire,
  authDomain: "kaori-xp-146b4.firebaseapp.com",
  databaseURL: "https://kaori-xp-146b4.firebaseio.com",
  projectId: "kaori-xp-146b4",
  storageBucket: "kaori-xp-146b4.appspot.com",
  messagingSenderId: "43712754967",
  appId: "1:43712754967:web:f16b63b58523b5f1157352",
};
// Initialize Firebase
firebase.initializeApp(configF);

console.log("FireBase Ok!");


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