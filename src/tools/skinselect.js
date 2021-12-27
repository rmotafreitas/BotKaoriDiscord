const econmyDB = require("./classes/economy").economyDB;
async function skinselect(msg, pages, id) {
  var skinName;
  const emojiList = ["⏪", "⏩", "✅"];
  const timeout = 3 * 60 * 1000;
  if (!msg && !msg.channel) throw new Error("Channel is inaccessible.");
  if (!pages) throw new Error("Pages are not given.");
  let page = 0;
  const curPage = await msg.channel.send(
    pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)
  );
  for (const emoji of emojiList) await curPage.react(emoji);
  const reactionCollector = curPage.createReactionCollector(
    (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
    { time: timeout }
  );
  reactionCollector.on("collect", async (reaction) => {
    reaction.users.remove(msg.author);
    switch (reaction.emoji.name) {
      case emojiList[0]:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case emojiList[1]:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      case emojiList[2]:
        const profile = new econmyDB(id);
        await profile.init();
        skinName = profile.skins[page];
        await profile.selectSkin(skinName);
        msg
          .inlineReply("Updated!")
          .then((msg) => {
            msg.delete({
              timeout: 8000 /*time unitl delete in milliseconds*/,
            });
          })
          .catch();
      default:
        break;
    }
    curPage.edit(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
  });
  reactionCollector.on("end", () => {
    if (!curPage.deleted) {
      curPage.reactions.removeAll();
    }
  });
  return curPage;
}

module.exports = {
  skinselect,
};
