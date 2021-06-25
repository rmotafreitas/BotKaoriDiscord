const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const execute = async (bot, msg, args) => {
  let user = msg.mentions.users.first() || msg.author;

  if (user.presence.activities[1].name === "Spotify") {
    let trackIMG = `https://i.scdn.co/image/${user.presence.activities[1].assets.largeImage.slice(
      8
    )}`;
    let trackURL = `https://open.spotify.com/track/${user.presence.activities[1].syncID}`;
    let trackName = user.presence.activities[1].details;
    let trackAuthor = user.presence.activities[1].state;
    let trackAlbum = user.presence.activities[1].assets.largeText;
    let lyrics = (await lyricsFinder(trackAuthor, trackName)) || "Not Found!";
    const embed = new MessageEmbed()
      .setAuthor(
        "Spotify Track Info",
        "https://cdn.discordapp.com/emojis/653135129870336031.png?v=1"
      )
      .setColor("GREEN")
      .setThumbnail(trackIMG)
      .addField("Song Name", trackName, true)
      .addField("Album", trackAlbum, true)
      .addField("Author", trackAuthor, false)
      .addField("Listen to Track", `${trackURL}`, false)
      .setFooter(msg.member.displayName, msg.author.displayAvatarURL())
      .setTimestamp();
    const part1 = lyrics.slice(0, 1024);
    const part2 = lyrics.slice(1024, 2048);
    const part3 = lyrics.slice(2049, 3072);
    const part4 = lyrics.slice(3073, 4096);
    const part5 = lyrics.slice(4097, 5121);
    const part6 = lyrics.slice(5122, 5800);
    console.log("part 1" + part1, "part 2" + part2, "part 3" + part3, "part 4" + part4, "part 5" + part5, "part 6" +part6);
    
      embed.addFields({ name: "Lyrics", value: part1 }, { name: "⠀", value: part2 });
    
/*
    if (lyrics.length < 3073) {
      embed.addFields(
        { name: "⠀", value: part1 },
        { name: "⠀", value: part2 },
        { name: "⠀", value: part3 }
      );
    }

    if (lyrics.length < 4097) {
      embed.addFields(
        { name: "⠀", value: part1 },
        { name: "⠀", value: part2 },
        { name: "⠀", value: part3 },
        { name: "⠀", value: part4 }
      );
    }

    if (lyrics.length < 5122) {
      embed.addFields(
        { name: "⠀", value: part1 },
        { name: "⠀", value: part2 },
        { name: "⠀", value: part3 },
        { name: "⠀", value: part4 },
        { name: "⠀", value: part5 }
      );
    }

    if (partsToSlice == 6) {
      embed.addFields(
        { name: "⠀", value: part1 },
        { name: "⠀", value: part2 },
        { name: "⠀", value: part3 },
        { name: "⠀", value: part4 },
        { name: "⠀", value: part5 },
        { name: "⠀", value: part6 }
      );
    }*/
    msg.channel.send(embed);
  } else {
    msg.channel.send("**This user isn't listening to Spotify!**");
  }
};

module.exports = {
  name: "spotify",
  section: "🎵 Music",
  execute,
};
