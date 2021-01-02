const { MessageEmbed } = require("discord.js");
const HMfull = require("hmfull");
const getHelp = require("../../util/helpDoubt.js").helpDoubt;
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
    msg.channel.send(`${sender}, You must mention a user!`);
    getHelp(msg, bot, "kiss");
    return;
  }
  let quemId = msg.mentions.users.first().id;
  let quemPic = msg.mentions.users.first();
  quemPic = quemPic.displayAvatarURL({ size: 4096, dynamic: true });

  let switcher;

  if (msg.author.id === quemId) {
    await msg.delete().catch((O_o) => {});
    msg.channel.send(`${sender}, Wait, is that possible !?`);
    return;
  }
  let kiss = await HMfull.Nekos.sfw.kiss();
  kiss = kiss.url;

  const Embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(senderTag, senderPic)
    .setTitle(" 😻 Kissed: ")
    .setDescription(quem)
    .setImage(kiss)
    .setFooter("💞 Click to return!");
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

    let kiss = await HMfull.Nekos.sfw.kiss();
    kiss = kiss.url;

    const Embed = new MessageEmbed()
      .setColor(`RANDOM`)
      .setAuthor(senderTag, senderPic)
      .setTitle(" 😻 Kissed: ")
      .setDescription(quem)
      .setImage(kiss)
      .setFooter("💞 Click to return!");
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

          Retornar();
        } else {
        }
      })
      .catch((collected) => {});
  }
};

module.exports = {
  name: "kiss",
  section: "<:yay:764881220773216297> Anime",
  help: "Kiss someone",
  usage: "kiss @mention",
  execute,
};
