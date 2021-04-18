const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const firebase = require("firebase");
const mongoose = require("mongoose");

//const DBL = require("dblapi.js");

//? Connect to firebase
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

//? Config
dotenv.config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();

/*const dbl = new DBL(process.env.topggToken, bot);
// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})*/

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

//? Connect to MongoDb Economy
mongoose.connect(process.env.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("MongoDb Ok!");
//? Events

const eventsFolder = fs.readdirSync(path.join(__dirname, "/events"));

for (var folder of eventsFolder) {
  const files = fs
    .readdirSync(path.join(__dirname, "/events", folder))
    .filter((filename) => /^.*\.(t|j)s$/.test(filename));
  for (const filename of files) {
    const event = require(`./events/${folder}/${filename}`);
    const eventName = filename.split(".").shift();
    bot.on(eventName, event.bind(null, bot));
  }
}

// keepAlive.js
const fetch = require("node-fetch");

// globals
const interval = 25 * 60 * 1000; // interval in milliseconds - {25mins x 60s x 1000}ms
const url = "https://bot-kaori-node.herokuapp.com/";
wake();
function wake() {
  try {
    const handler = setInterval(() => {
      fetch(url).then((res) =>
        console
          .log(`response-ok: ${res.ok}, status: ${res.status}`)
          .catch((err) => console.error(`Error occured: ${err}`))
      );
    }, interval);
  } catch (err) {
    console.error("Error occured: retrying...");
    clearInterval(handler);
    return setTimeout(() => wake(), 10000);
  }
} 
const lavaUrl = process.env.lava
wakeLavaLink()
function wakeLavaLink() {
  try {
    const handler = setInterval(() => {
      fetch(lavaUrl).then((res) =>
        console
          .log(`response-ok: ${res.ok}, status: ${res.status}`)
          .catch((err) => console.error(`Error occured: ${err}`))
      );
    }, interval);
  } catch (err) {
    console.error("Error occured: retrying...");
    clearInterval(handler);
    return setTimeout(() => wake(), 10000);
  } 
}
