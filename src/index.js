const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const firebase = require("firebase");
const { MessageEmbed } = require("discord.js");

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

const database = firebase.database();

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

bot.login(process.env.TOKEN);
bot.on("ready", function () {
  console.log(
    `Estou conectado como ${bot.user.username} em ${bot.guilds.cache.size} servidores e users ${bot.users.cache.size}`
  );
  bot.user.setActivity("$help", { type: 3 });
});

bot.on("message", function (msg) {
  if (msg.channel.type == "DM") return;
  if (msg.author.bot) return;
  database
    .ref(`Servidores/Levels/${msg.guild.id}/Config`)
    .once("value")
    .then(async function (db) {
      if (db.val() == null) {
        database.ref(`Servidores/Levels/${msg.guild.id}/Config`).set({
          systemXp: "off",
          channelXp: "off",
          systemWelcome: "off",
          channelWelcome: "off",
          systemLogs: "off",
          channelLogs: "off",
          prefix: "$",
        });
      } else if (db.val().systemXp == "on") {
        //console.log(db.val().channelXp);
        let lvlChannel = db.val().channelXp;
        database
          .ref(`Servidores/Levels/${msg.guild.id}/${msg.author.id}`)
          .once("value")
          .then(async function (db) {
            if (db.val() == null) {
              database
                .ref(`Servidores/Levels/${msg.guild.id}/${msg.author.id}`)
                .set({
                  lb: "all",
                  xp: 0,
                  level: 1,
                });
            } else {
              let gerarXP = Math.floor(Math.random() * 10) + 1;

              if (db.val().level * 100 <= db.val().xp) {
                database
                  .ref(`Servidores/Levels/${msg.guild.id}/${msg.author.id}`)
                  .update({
                    xp: 0,
                    level: db.val().level + 1,
                  });

                console.log(lvlChannel);
                let Embed = new MessageEmbed()
                  .setColor("RANDOM")
                  .setDescription(
                    `Congrats, ${msg.author}! Level up ${db.val().level + 1}!`
                  );
                bot.channels.cache.get(lvlChannel).send(Embed);
              } else {
                database
                  .ref(`Servidores/Levels/${msg.guild.id}/${msg.author.id}`)
                  .update({
                    xp: db.val().xp + gerarXP,
                  });
              }
            }
          });
      }
    });
});
// Boas Vindas!

bot.on("guildMemberAdd", async (member) => {
  //guild
  let guilds = [
    bot.guilds.cache.get("730079290221396008"), //Kaoir Bot Server
    bot.guilds.cache.get("729166259924762664"), //Animes Server
  ]; //IDs SERVER

  let channels = [
    bot.channels.cache.get("730079290221396013>"), //Kaoir Bot Server
    bot.channels.cache.get("740921877970550795"), //Animes Server
  ]; //IDs CANAL

  let channel = ["0"]; //ID Canal
  let guild = ["0"]; //ID Server
  let emoji = "<a:chibi_cola:731167866337886249>";

  let welcomeGif = [
    "https://i.pinimg.com/originals/04/dd/db/04dddb24a548c4ce1069513d5cdd4d7a.gif",
    "https://68.media.tumblr.com/8b8a99492ffba7ec6b1e429d2891ee22/tumblr_ohgvn0QWcE1qkz08qo1_540.gif",
    "https://i.pinimg.com/originals/50/eb/47/50eb47c78063d41c26ab6a8556fc3976.gif",
    "https://data.whicdn.com/images/243960123/original.gif",
    "https://data.whicdn.com/images/270710058/original.gif",
  ];

  let gif = welcomeGif[Math.floor(Math.random() * welcomeGif.length)];

  let flag = false;

  guilds.forEach(function (item, index, array) {
    if (guilds[index] != member.guild) {
      return;
    } else {
      flag = true;
      channel = channels[index];
      guild = guilds[index];
    }
  });

  if (flag == true) {
    const embed = new Discord.MessageEmbed()
      .setColor("#DE3B72")
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ size: 4096, dynamic: true })
      )
      .setTitle(`${emoji} WELCOME!`)
      .setImage(gif)
      .setDescription(
        `${member.user}, Welcome to ${guild.name}! member nº ${member.guild.memberCount}`
      )
      .setThumbnail(
        member.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 1024,
        })
      )
      .setFooter("ID: " + member.user.id)
      .setTimestamp();
    await channel.send(embed);

    //Kaori auto role
    if (guild == "730079290221396008") {
      const role = guild.roles.cache.find((role) => role.name === "Members");
      member.roles.add(role);
    }
    //
  }
});

//Fim de boas vindas

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
