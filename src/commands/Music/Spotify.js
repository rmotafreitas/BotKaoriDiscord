const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const canvacord = require("canvacord");

module.exports = {
  name: "spotify",
  category: "Music",
  cooldown: 2000,
  description: "Tag a user to see what is he listening on spotify",
  usage: "spotify {@mention}",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    if (!args[0]) {
      var user = message.author;
    } else {
      var user =
        message.mentions.users.first() || client.users.cache.get(args[0]);
    }

    let activity =
      user.presence.activities.find((s) =>
        ["PLAYING", "WATCHING", "LISTENING"].includes(s.type)
      ) || false;

    const isSpotify = activity.name == "Spotify" ? true : false;

    if (!isSpotify) return message.inlineReply("No spotify detected!");
    const track = {
      img: `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`,
      url: `https://open.spotify.com/track/${activity.syncID}`,
      name: activity.details,
      author: activity.state,
      album: activity.assets.largeText,
    };

    const card = new canvacord.Spotify()
      .setAuthor(track.author)
      .setAlbum(track.album)
      .setStartTimestamp(activity.timestamps.start)
      .setEndTimestamp(activity.timestamps.end)
      .setImage(track.img)
      .setTitle(track.name);

    const attachment = await card.build().then((buffer) => {
      canvacord.write(buffer, "spotify.png");

      return new MessageAttachment(buffer, "spotify.png");
    });

    const embed = new MessageEmbed()
      .setAuthor(
        "Spotify Track Info",
        "https://cdn.discordapp.com/emojis/653135129870336031.png?v=1"
      )
      .setColor("GREEN")
      .addFields(
        { name: "Song Name", value: track.name, inline: true },
        { name: "Album", value: track.album, inline: true }
      )
      .addFields(
        { name: "Author", value: track.author, inline: true },
        {
          name: "Listen to track",
          value: `[__Click here__](${track.url})`,
          inline: true,
        }
      )
      .addField("View lyrics: ", "Click on 🎶", true)
      .addField("⠀", "⠀", true)
      .setFooter(user.tag, user.displayAvatarURL())
      .setImage("attachment://spotify.png")
      .attachFiles(attachment)
      .setTimestamp();

    message.inlineReply(embed).then((message) => {
      message.react("🎶").then((r) => {
        const lyricsFilter = (reaction, user) => reaction.emoji.name === "🎶";

        const lyrics = message.createReactionCollector(lyricsFilter, {
          time: 60000,
        });

        lyrics.on("collect", async (r) => {
          async function removeAll() {
            userReactions = message.reactions.removeAll();
          }

          let letra =
            (await lyricsFinder(track.author, track.name)) || "Not Found!";

          if (letra == "Not Found!") {
            removeAll();
            return message.channel.send("I din't find any lyrics!");
          }

          const lyricsEmbed = new MessageEmbed()
            .setAuthor(`${track.name} | ${track.author}`)
            .setTitle("Lyrics: ")
            .setColor("GREEN")
            .setTimestamp();

          if (letra.length > 1024) {
            for (i = 0; letra.length > 1024 * (i + 1); i++) {
              lyricsEmbed.addField(
                "⠀",
                letra.slice(i * 1024, 1024 * (i + 1)),
                false
              );
            }
          } else {
            lyricsEmbed.addField({
              name: "⠀",
              value: letra,
            });
          }
          removeAll();
          return message.channel.send(lyricsEmbed);
        });
      });
    });
  },
};
