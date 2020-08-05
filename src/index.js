const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();
//command handler
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
/*const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"));

for (var filename of commandFiles) {
  const command = require(`./commands/${filename}`);
  bot.commands.set(command.name, command);
}*/

bot.login(process.env.TOKEN);

bot.on("ready", function () {
  console.log(
    `Estou conectado como ${bot.user.username} em ${bot.guilds.cache.size} servidores`
  );
  bot.user.setActivity("$help", { type: 3 });
});

bot.on("message", (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type == "dm") return;
  if (!msg.content.toLowerCase().startsWith(process.env.PREFIX)) return;
  if (
    msg.content.startsWith(`<@!${bot.user.id}>`) ||
    msg.content.startsWith(`<@${bot.user.id}>`)
  )
    return;

  const args = msg.content.slice(process.env.PREFIX.length).split(" ");

  const command = args.shift();

  try {
    bot.commands.get(command).execute(bot, msg, args);
  } catch (e) {
    //return msg.reply("Ops! Eu ainda não conheço esse comando!");
  }
});
