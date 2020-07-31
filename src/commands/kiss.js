const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  //sender info
  let sender = msg.author;
  let senderTag = msg.author.tag;
  let senderId = msg.author.id;
  let senderPic = msg.author.displayAvatarURL({ size: 4096, dynamic: true });
  //quem info
  let quemTag;
  let quem = msg.content.slice(process.env.PREFIX.length).split(" ");
  quem = quem[1];
  try {
    quemTag = msg.mentions.users.first().tag;
  } catch (e) {
    await msg.delete().catch((O_o) => {});
    msg.channel.send(`${sender}, Depois do $kiss vc deve mencionar um usuer!`);
    return;
  }
  let quemId = msg.mentions.users.first().id;
  let quemPic = msg.mentions.users.first();
  quemPic = quemPic.displayAvatarURL({ size: 4096, dynamic: true });

  let switcher;

  if (msg.author.id === quemId) {
    await msg.delete().catch((O_o) => {});
    msg.channel.send(`${sender}, Espera, isso é possível!?`);
    return;
  }

  let kisses = [
    "https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif",
    "https://i.imgur.com/OE7lSSY.gif",
    "https://i.gifer.com/B82h.gif",
    "https://i.gifer.com/B82h.gif",
    "https://i.pinimg.com/originals/32/d4/f0/32d4f0642ebb373e3eb072b2b91e6064.gif",
    "https://cutewallpaper.org/21/anime-girl-kiss-anime-girl/Girl-Anime-GIF-Girl-Anime-KissAnime-Discover-Share-GIFs.gif",
    "https://66.media.tumblr.com/06e4ba7955ad8ee651952ad12dd47a67/39eb4a3335e0c136-8f/s540x810/976c57225a62a4ef6f7742f1937e8be2b75fae8d.gif",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/917ca7eb-672e-46fe-b0b2-253dbe3a41fc/dasbj5r-910436e0-aacd-430b-a58c-954240190ab2.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOTE3Y2E3ZWItNjcyZS00NmZlLWIwYjItMjUzZGJlM2E0MWZjXC9kYXNiajVyLTkxMDQzNmUwLWFhY2QtNDMwYi1hNThjLTk1NDI0MDE5MGFiMi5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.dBRJVXEmQNWpQYHMSzbwPgBgGE-ipksliWz1SL8EMbg",
    "https://i.imgur.com/Rvst3KQ.gif",
    "https://media1.tenor.com/images/ea9a07318bd8400fbfbd658e9f5ecd5d/tenor.gif?itemid=12612515",
    "https://i.imgur.com/i1PIph3.gif",
    "https://pa1.narvii.com/6248/cae38662b21747d6247776d35b8d2db50944ef08_hq.gif",
    "https://media.giphy.com/media/ONq87vZz4626k/giphy.gif",
    "https://media1.giphy.com/media/nyGFcsP0kAobm/giphy.gif",
    "https://cdn.lowgif.com/full/011acd5511e7c9fc-anime-kiss-gifs-tumblr.gif",
    "https://33.media.tumblr.com/4c3d6dbd4a87caa9ba82c8a41b9d5109/tumblr_mx3osfo7uj1rlxmzgo1_500.gif",
    "https://37.media.tumblr.com/70d58855d3d6dc8fcda71e68fe6889d0/tumblr_n5hm4rqX6O1skkm34o1_500.gif",
  ];

  let kiss = kisses[Math.floor(Math.random() * kisses.length)];

  const Embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(senderTag, senderPic)
    .setTitle(" 😻 Beijou: ")
    .setDescription(quem)
    .setImage(kiss)
    .setFooter("💞 Clique pra retornar!");
  await msg.delete().catch((O_o) => {});
  let msgEmbed = await msg.channel.send(Embed);
  msgEmbed.react("💞");

  const filter = (reaction, user) => {
    return ["💞"].includes(reaction.emoji.name) && user.id === quemId;
  };

  msgEmbed
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === "💞") {
        msgEmbed.reactions
          .removeAll()
          .catch((error) =>
            console.error("Failed to clear reactions: ", error)
          );
        if (quemTag === "Kaori Miyazono#5192") {
          return;
        }
        console.log("RETORNAR");
        Retornar();
      } else {
      }
    })
    .catch((collected) => {
      console.log("Error!");
    });

  async function Retornar() {
    switcher = sender;
    sender = quem;
    quem = switcher;

    switcher = senderTag;
    senderTag = quemTag;
    quemTag = switcher;

    switcher = senderId;
    senderId = quemId;
    quemId = switcher;

    switcher = senderPic;
    senderPic = quemPic;
    quemPic = switcher;

    let kiss = kisses[Math.floor(Math.random() * kisses.length)];

    const Embed = new MessageEmbed()
      .setColor(`RANDOM`)
      .setAuthor(senderTag, senderPic)
      .setTitle(" 😻 Beijou: ")
      .setDescription(quem)
      .setImage(kiss)
      .setFooter("💞 Clique pra retornar!");
    msgEmbed = await msg.channel.send(Embed);
    msgEmbed.react("💞");
    const filter = (reaction, user) => {
      return ["💞"].includes(reaction.emoji.name) && user.id === quemId;
    };

    msgEmbed
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();

        if (reaction.emoji.name === "💞") {
          msgEmbed.reactions
            .removeAll()
            .catch((error) =>
              console.error("Failed to clear reactions: ", error)
            );
          console.log("RETORNAR 2 !");
          Retornar();
        } else {
        }
      })
      .catch((collected) => {});
  }
};

module.exports = {
  name: "kiss",
  help: "Beija alguêm!",
  execute,
};
