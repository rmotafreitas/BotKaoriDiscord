const { MessageEmbed } = require("discord.js");
const firebase = require("firebase");

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

const message = async (bot, msg) => {
  if (msg.channel.type == "DM") return;
  if (msg.author.bot) return;
  if (
    msg.mentions.has(bot.user) &&
    msg.content.split(" ").length === 1 &&
    msg.content != "@everyone" &&
    msg.content != "@here"
  )
    return msg.reply("HEY, \nMy prefix is `$`\nIf you want help use `$help`");

  if (
    msg.content.startsWith(`<@!${bot.user.id}>`) ||
    msg.content.startsWith(`<@${bot.user.id}>`)
  )
    return;

  const args = msg.content.slice(process.env.PREFIX.length).split(" ");

  const command = args.shift();

  try {
    bot.commands.get(command).execute(bot, msg, args);
    //fazer embed
    let arg = msg.content.split(" ");
    var title = arg[0];

    const embed = new Discord.MessageEmbed()
      .setColor("#DE3B72")
      .setAuthor(msg.author.tag)
      .setTitle(arg[0])
      .setDescription(`**Conteúdo:** ${msg.content}`);

    bot.channels.cache.get("771007139598172191").send(embed);
  } catch (e) {
    //return msg.reply("Ops! Eu ainda não conheço esse comando!");
  }

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
};

module.exports = {
  message,
};
