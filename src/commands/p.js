const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = (bot, msg, args) => {
  const s = args.join(" ");

  try {
    search(s, (err, result) => {
      if (err) {
        throw err;
      } else if (result && result.videos.length > 0) {
        const song = result.videos[0];
        const queue = bot.queues.get(msg.guild.id);
        if (queue) {
          queue.songs.push(song);
          bot.queues.set(msg.guild.id, queue);
          const embed = new MessageEmbed()
            .setColor("#FF3832")
            .setAuthor(
              "Adicionada ♪",
              "https://thumbs.gfycat.com/ImpeccableSickEstuarinecrocodile-small.gif"
            )
            .setTitle(song.title)
            .setDescription("<:youtube:730741995416453150> YouTube Music!")
            .setURL(song.url)
            .setThumbnail(song.thumbnail);
          msg.channel.send(embed);
        } else playSong(bot, msg, song);
      } else {
        return msg.reply("desculpe, não encontrei o que você desejava!");
      }
    });
  } catch (e) {
    console.error(e);
  }
};

const playSong = async (bot, msg, song) => {
  let queue = bot.queues.get(msg.member.guild.id);
  if (!song) {
    if (queue) {
      queue.connection.disconnect();
      return bot.queues.delete(msg.member.guild.id);
    }
  }
  if (!msg.member.voice.channel) {
    return msg.reply(
      "você precisa estar em um canal de voz para reproduzir uma música!"
    );
  }
  //Manda emebed
  const embed = new MessageEmbed()
    .setColor("#FF3832")
    .setAuthor(
      "A tocar ♪ ...",
      "https://media3.giphy.com/media/XGbfacwWVO9J34OSBL/giphy.gif"
    )
    .setTitle(song.title)
    .setDescription("<:youtube:730741995416453150> YouTube Music!")
    .setURL(song.url)
    .setThumbnail(song.thumbnail);
  msg.channel.send(embed);

  //
  if (!queue) {
    const conn = await msg.member.voice.channel.join();
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };
  }
  queue.dispatcher = await queue.connection.play(
    await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
    {
      type: "opus",
    }
  );
  queue.dispatcher.on("finish", () => {
    queue.songs.shift();

    playSong(bot, msg, queue.songs[0]);
  });
  bot.queues.set(msg.member.guild.id, queue);
};

module.exports = {
  name: "p",
  help: "Reproduz a música desejada no canal atual do usuário",
  execute,
  playSong,
};
