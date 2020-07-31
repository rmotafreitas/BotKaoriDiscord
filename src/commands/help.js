//⚙️
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let id = msg.author.id;
  let autor = msg.author;
  msg.delete().catch((O_o) => {});
  let description = [
    "** Comandos de Divertimento - 🥳 **",
    "** Comandos de ajuda - 🔧 **",
    "** Comandos de musica, beta - 🎵 **",
    "** Menu - ⬆️**",
  ];

  let diverts = [
    "$8ball | Responde a suas perguntas!",
    "$8ball sua pergunta",
    "-----------------------",
    "$say | O Bot fala o q vc quiser!",
    "$say frase",
    "-----------------------",
    "$kiss | Beija alguêm",
    "$kiss @user",
    "-----------------------",
    "$emoji | Emoji animado sem nitro",
    "$emoji",
    "-----------------------",
    "$avatar | Mostra avatar de mencionado ou o seu",
    "$avatar @user OU $avatar",
  ];

  let musicas = [
    "$p | O bot toca musica",
    "$p nome da música",
    "-----------------------",
    "$pause | O bot pausa a música",
    "$pause",
    "-----------------------",
    "$skip | O bot passa a música",
    "$skip",
    "-----------------------",
    "$resume| O bot continua a música",
    "$resume",
    "-----------------------",
    "$stop | O bot para de tocar música",
    "$stop",
    "-----------------------",
    "$queue | Mostra as música em fila",
    "$queue",
  ];

  let ajudas = [
    "$vote | Inicia uma votaçào",
    "$vote assunto",
    "-----------------------",
    "$help | Mostra a lista de comandos",
    "$help",
    "-----------------------",
    "$info | Mostra as minhas info.",
    "$info",
    "-----------------------",
    "$clear | Limpa mensagens",
    "$clear 15",
    "-----------------------",
    "$hack | Mostra as info de um user",
    "$hack @ OU $hack",
  ];

  const embed = new MessageEmbed() //criar emebed
    .setColor(`RANDOM`)
    .setDescription(description)
    .setTitle("Lista de comandos:");
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
        if (embed.title === "Comandos de Divertimento - 🥳") {
          msg.channel
            .send(`${autor}, Vc já está no divertimento`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Comandos de Divertimento - 🥳");
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
        if (embed.title === "Comandos de ajuda - 🔧") {
          msg.channel
            .send(`${autor}, Vc já está no ajuda`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Comandos de ajuda - 🔧");
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
        if (embed.title === "Comandos de musica, beta - 🎵") {
          msg.channel
            .send(`${autor}, Vc já está no musicas`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }
        embed.setTitle("Comandos de musica, beta - 🎵");
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
        if (embed.title === "Lista de comandos:") {
          msg.channel
            .send(`${autor}, Vc já está no menu`)
            .then((msg) => msg.delete({ timeout: 3500 }));
          remove();
          return;
        }

        embed.setColor(`RANDOM`);
        embed.setDescription(description);
        embed.setTitle("Lista de comandos:");

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
