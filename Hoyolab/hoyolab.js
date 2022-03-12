const { Client, Message } = require("discord.js");
const { App } = require("../../tools/classes/hoyolabClient");
const { EmbedPages } = require("../../tools/embedPages");

module.exports = {
  name: "hoyolab",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    const uid = await App.getUIDByNick(query);
    if (!uid) {
      return message.channel.send("Not found");
    }
    /*
    const user = await App.getProfileInfo(uid);
    const image = await App.buildCanvas(user);
    const img = new MessageAttachment(image, "user.png");
    return message.channel.send(img);
    */
    const arrEmbeds = await App.getUserPosts(uid);
    if (arrEmbeds.length > 1) {
      return await EmbedPages(message, arrEmbeds, false, ["⏪", "⏩"], 60000);
    } else {
      return message.channel.send(arrEmbeds[0]);
    }
  },
};
