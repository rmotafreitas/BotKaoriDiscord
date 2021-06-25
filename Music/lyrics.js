const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Genius = new (require("genius-lyrics").Client)(process.env.GENIUS);
const execute = async (bot, msg, args) => {
  let music = args.join(" ");
  Genius.tracks
    .search(music, { limit: 1 })
    .then((results) => {
      const song = results[0];
      song.lyrics().then((lyrics) => {
        let Embed = new MessageEmbed().setDescription(lyrics).setTimestamp();
        msg.channel.send(Embed);
      });
    })
    .catch((err) => console.error(err));
};

module.exports = {
  name: "lyrics",
  section: "🎵 Music",
  help: "Show music lyrics",
  usage: "lyrics [Song Name]",
  example: "lyrics Shape Of You",
  aliases: ['ly'],
  execute,
};
