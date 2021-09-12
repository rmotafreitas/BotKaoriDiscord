const { Client, Message, MessageEmbed } = require("discord.js");
const watchlists = require("../../models/watchlist");
const getUser = require("./../../tools/getUser.js").getUser;

module.exports = {
  name: "watchlist",
  cooldown: 1,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = await getUser(client, message, args);
    if (user == undefined) return message.inlineReply("I din't find that user!");
    
    let data = await watchlists.findOne({
      userID: user.id,
    });

    if (!data)
      return message.inlineReply(
        user.id == message.author.id
          ? "You don't have a watch list, type `!cwl`"
          : "That user don't have a watch list"
      );

    let watching = data.watching;

    for (i = 0; i < watching.length; i++) {
      watching[i] = `➥ ${watching[i]}`;
    }

    let toWatch = data.toWatch;

    for (i = 0; i < toWatch.length; i++) {
      toWatch[i] = `➥ ${toWatch[i]}`;
    }

    let completed = data.completed;

    for (i = 0; i < completed.length; i++) {
      completed[i] = `➥ ${completed[i]}`;
    }

    let onHold = data.onHold;

    for (i = 0; i < onHold.length; i++) {
      onHold[i] = `➥ ${onHold[i]}`;
    }

    let dropped = data.dropped;

    for (i = 0; i < dropped.length; i++) {
      dropped[i] = `➥ ${dropped[i]}`;
    }

    const embed = new MessageEmbed()
      .setTitle(`${data.nickname} Watch List`)
      .setColor("BLUE")
      .setImage(
        "https://i.pinimg.com/originals/1d/f1/2f/1df12fc81d34d2592196cc86210f1998.gif"
      )
      .setTimestamp();

    if (watching.length > 0) {
      if (watching.join("\n").length > 1024) {
        for (i = 0; watching.join("\n").length > 1024 * (i + 1); i++) {
          embed.addField(
            i == 0 ? "👀 Watching:" : "⠀",
            watching.join("\n").slice(i * 1024, 1024 * (i + 1)),
            false
          );
        }
      } else {
        embed.addField("👀 Watching:", watching.join("\n"), false);
      }
    } else {
      embed.addField("👀 Watching:", "0 Animes ❌", false);
    }

    if (dropped.length > 0) {
      if (dropped.join("\n").length > 1024) {
        for (i = 0; dropped.join("\n").length > 1024 * (i + 1); i++) {
          embed.addField(
            i == 0 ? "🚮 Dropped:" : "⠀",
            dropped.join("\n").slice(i * 1024, 1024 * (i + 1)),
            false
          );
        }
      } else {
        embed.addField({
          name: "🚮 Dropped:",
          value: dropped.join("\n"),
        });
      }
    } else {
      embed.addField("🚮 Dropped:", "0 Animes ❌", false);
    }

    if (onHold.length > 0) {
      if (onHold.join("\n").length > 1024) {
        for (i = 0; onHold.join("\n").length > 1024 * (i + 1); i++) {
          embed.addField(
            i == 0 ? "🙄 On Hold:" : "⠀",
            onHold.join("\n").slice(i * 1024, 1024 * (i + 1)),
            false
          );
        }
      } else {
        embed.addFields({
          name: "🙄 On Hold:",
          value: onHold.join("\n"),
        });
      }
    } else {
      embed.addField("🙄 On Hold:", "0 Animes ❌", false);
    }

    if (toWatch.length > 0) {
      if (toWatch.join("\n").length > 1024) {
        for (i = 0; toWatch.join("\n").length > 1024 * (i + 1); i++) {
          embed.addField(
            i == 0 ? "📚 To Watch:" : "⠀",
            toWatch.join("\n").slice(i * 1024, 1024 * (i + 1)),
            false
          );
        }
      } else {
        embed.addFields({
          name: "📚 To Watch:",
          value: toWatch.join("\n"),
        });
      }
    } else {
      embed.addField("📚 To Watch:", "0 Animes ❌", false);
    }

    if (completed.length > 0) {
      if (completed.join("\n").length > 1024) {
        for (i = 0; completed.join("\n").length > 1024 * (i + 1); i++) {
          embed.addField(
            i == 0 ? "✅ Completed:" : "⠀",
            completed.join("\n").slice(i * 1024, 1024 * (i + 1)),
            false
          );
        }
      } else {
        embed.addField("✅ Completed:", completed.join("\n"), false);
      }
    } else {
      embed.addField("✅ Completed:", "0 Animes ❌", false);
    }

    message.channel.send(embed);
  },
};
