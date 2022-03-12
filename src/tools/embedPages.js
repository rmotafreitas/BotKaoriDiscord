async function EmbedPages(
  message,
  pages,
  pageTravel = false,
  emoji = ["⏪", "⏩"],
  time = 6000
) {
  message.channel.send(pages[0]).then(async (msg) => {
    await msg.react(emoji[0]);
    await msg.react(emoji[1]);

    const filter = (reaction, user) =>
      emoji.includes(reaction.emoji.name) && user.id === message.author.id;

    const collector = msg.createReactionCollector(filter, { time: time });
    let i = 0;
    collector.on("collect", async (reaction, user) => {
      reaction.users.remove(user);
      switch (reaction.emoji.name) {
        case emoji[0]:
          if (i === 0) i = pages.length;
          i--;
          break;
        case emoji[1]:
          if (i === pages.length - 1) i = -1;
          i++;
          break;
      }
      await msg.edit(pages[i]);
    });
    collector.on("end", () => {
      msg.reactions.removeAll();
      pages[i].setFooter(
        `${pages[i].footer.text} ⏱️ Timout Pages`,
        pages[i].footer.iconURL
      );
      msg.edit(pages[i]);
    });
    if (pageTravel === true) {
      message.channel
        .createMessageCollector((x) => x.author.id === message.author.id, {
          time: time,
          errors: ["time"],
        })
        .on("collect", async (data) => {
          const a = data.content;
          if (isNaN(a)) return;
          data.delete();
          const b = parseInt(a);
          if (b > 0 && b - 1 <= pages.length) {
            i = b - 1;
            msg.edit(pages[b - 1]);
          }
        });
    }
    return msg;
  });
}

module.exports = {
  EmbedPages,
};
