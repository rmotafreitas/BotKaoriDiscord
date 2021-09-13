const { Client, Message, MessageEmbed } = require('discord.js');
const { searchManga } = require("@freezegold/anime.js");
const colors = require("../../json/colors.json");

module.exports = {
    name: 'manga',
    cooldown: 2000,
    category : 'Anime',
    description : 'Get a manga descrption about a query',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args.join(" ");
    if (!query) return message.inlineReply("Please type a name of an anime!");
    const manga = await searchManga(query, 1).then((res) => {
      return res[0];
    });
    function trim(input) {
      return input.length > 1024 ? `${input.slice(0, 1015)} [...]` : input;
    }
    const embed = new MessageEmbed()
      .setColor(colors.blue)
      .setAuthor(manga.titles.en, "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png")
      .setTitle("Manga")
      .addFields(
        {
          name: "Titles: ",
          value:
            `➥ English: ${manga.titles.en}\n` +
            `➥ Romaji: ${manga.titles.enJp}`,
          inline: true,
        },
        {
          name: "Ratings: ",
          value:
            `➥ Readers: ${manga.userCount}\n` +
            `➥ Favourites: ${manga.favoritesCount}\n` +
            `➥ Ratings: ${manga.averageRating} ⭐`,
          inline: true,
        },
        {
          name: "Synopsis: ",
          value: trim(manga.synopsis),
          inline: false,
        }
      )
      .setThumbnail(manga.posterImage.original)
      .setTimestamp();

    message.inlineReply(embed);
    }
}