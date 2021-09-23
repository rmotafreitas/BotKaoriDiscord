const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { skinselect } = require("../../tools/skinselect");
module.exports = {
  name: "changeskin",
  aliases: ["skins"],
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var skinColors = JSON.parse(
      JSON.stringify(require("../../json/skins.json"))
    );
    const profile = new econmyDB(message.author.id);
    await profile.init();
    const skins = profile.skins;
    const skn = [];
    skins.forEach(function (item, index, array) {
      skinColors[skins[index]].active = true;
      skn.push(skinColors[skins[index]]);
    });
    const embeds = [];
    for (i = 0; i < profile.skins.length; i++) {
      const embed = new MessageEmbed()
        .setTitle(`🖼 Skin ${i + 1} / ${profile.skins.length}`)
        .setDescription(
          `**➥💸:** This skins costs ${skn[i].price}$\n` +
            `**➥📷:** Clik [__here__](${skn[i].url}) to view on google!`
        )
        .setImage(skn[i].url)
        .setColor("YELLOW");
      embeds.push(embed);
    }
    return await skinselect(message, embeds, message.author.id);
  },
};
