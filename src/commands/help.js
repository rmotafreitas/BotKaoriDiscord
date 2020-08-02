//⚙️
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let id = msg.author.id;
  let autor = msg.author;
  msg.delete().catch((O_o) => {});
  let description = [
    "** Fun Commands - 🥳 **",
    "** Help Commands - 🔧 **",
    "** Commands music, Beta - 🎵 **",
    "** Menu - ⬆️**",
  ];

  let diverts = [
    "$8ball | Answer your questions!",
    "$8ball your question",
    "-----------------------",
    "$say | Bot says whatever you want!",
    "$say phrase",
    "-----------------------",
    "$kiss | Kiss someone",
    "$kiss @user",
    "-----------------------",
    "$emoji | Nitro animated emoji",
    "$emoji",
    "-----------------------",
    "$avatar | Shows mentioned avatar or yours",
    "$avatar @user OR $avatar",
    "-----------------------",
    "$waifu | Shows mentioned waifu or yours",
    "$waifu @user OR $waifu",
  ];

  let musicas = [
    "$p | Bot plays music from yt!",
    "$p musica name",
    "-----------------------",
    "$pause | Pause",
    "$pause",
    "-----------------------",
    "$skip | Skip",
    "$skip",
    "-----------------------",
    "$resume| Resume",
    "$resume",
    "-----------------------",
    "$stop | Stop",
    "$stop",
    "-----------------------",
    "$queue | Queue songs",
    "$queue",
  ];

  let ajudas = [
    "$vote | Start a vote",
    "$vote subject matter",
    "-----------------------",
    "$help | Show this Xd!",
    "$help",
    "-----------------------",
    "$info | Bot info",
    "$info",
    "-----------------------",
    "$clear | Clear message 1-99",
    "$clear 15",
    "-----------------------",
    "$hack | Show",
    "$hack @ OU $hack",
  ];

  const embed = new MessageEmbed() //criar emebed
    .setColor(`RANDOM`)
    .setDescription(description)
    .setTitle("List:");
  msg.channel.send(embed).then((msg) => {
    //enviando emebd e os objetos de pages //?(reactions await events?!) // ⏪  ⏩
    msg.react("🥳").then((r) => {
      //colocando reactions para andar nas pages
      msg.react("🔧");
      msg.react("🎵");
      msg.react("⬆️");

      //filtros
      const divertimentoF = (reaction, user) =>
        reaction.emoji.name === "🥳" && user.id === id;
      const settingsF = (reaction, user) =>
        reaction.emoji.name === "🔧" && user.id === id;
      const musicF = (reaction, user) =>
        reaction.emoji.name === "🎵" && user.id === id;
      const menuF = (reaction, user) =>
        reaction.emoji.name === "⬆️" && user.id === id;
      const divertimento = msg.createReactionCollector(divertimentoF, {
        time: 60000,
      });
      const settings = msg.createReactionCollector(settingsF, {
        time: 60000,
      });
      const music = msg.createReactionCollector(musicF, {
        time: 60000,
      });
      const menu = msg.createReactionCollector(menuF, {
        time: 60000,
      });

      divertimento.on("collect", (r) => {
        //🥳
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "Fun Commands - 🥳") {
          msg.channel
            .send(`${autor}, You are already in the fun`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Fun Commands - 🥳");
        embed.setDescription(diverts);
        msg.edit(embed);

        remove();
      });

      settings.on("collect", (r) => {
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "Help Commands - 🔧") {
          msg.channel
            .send(`${autor}, You are already in help`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Help Commands - 🔧");
        embed.setDescription(ajudas);
        msg.edit(embed);

        remove();
      });

      music.on("collect", (r) => {
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "Commands music, Beta - 🎵") {
          msg.channel
            .send(`${autor}, You are already in music`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Commands music, Beta - 🎵");
        embed.setDescription(musicas);
        msg.edit(embed);

        remove();
      });

      menu.on("collect", (r) => {
        async function remove() {
          const userReactions = msg.reactions.cache.filter((reaction) =>
            reaction.users.cache.has(id)
          );
          try {
            for (const reaction of userReactions.values()) {
              await reaction.users.remove(id);
            }
          } catch (error) {
            console.error("Failed to remove reactions.");
          }
        }
        if (embed.title === "List:") {
          msg.channel
            .send(`${autor}, You are already in menu`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }

        embed.setColor(`RANDOM`);
        embed.setDescription(description);
        embed.setTitle("List:");

        remove();
        msg.edit(embed);
      });
    });
  });
};

module.exports = {
  name: "help",
  help: "Embed edit page test",
  execute,
};
