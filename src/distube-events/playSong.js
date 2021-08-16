const { player } = require("../index");
const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require("./../json/colors.json");

player.on("playSong", async (message, queue, song) => {
  function trim(input) {
    return input.length > 45 ? `${input.slice(0, 40)} [...]` : input;
  }

  const embed = new MessageEmbed()
    .setTitle("Playing music 🎵")
    .setThumbnail(song.thumbnail)
    .setDescription(
      `🎶 ${"`"}Name:${"`"} [__${trim(song.name)}__](${song.url}) \n` +
        `🎤 ${"`"}From:${"`"} __${
          song.info.videoDetails.ownerChannelName
        }__\n` +
        `⏱ ${"`"}Duration:${"`"} __${song.formattedDuration}__`
    )
    .setTimestamp()
    .setColor(colors.red);
  message.channel.send(embed);
});
