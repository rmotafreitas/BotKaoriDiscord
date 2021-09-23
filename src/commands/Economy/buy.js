const { Client, Message, MessageEmbed } = require("discord.js");
const econmyDB = require("../../tools/classes/economy").economyDB;
const { embed } = require("../../tools/classes/fastEmbed");

module.exports = {
  name: "buy",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    var id = message.author.id;
    var skinColors = JSON.parse(
      JSON.stringify(require("../../json/skins.json"))
    );
    const profile = new econmyDB(message.author.id);
    await profile.init();
    const skins = profile.skins;

    skins.forEach(function (item, index, array) {
      skinColors[skins[index]].active = true;
    });

    if (!args[0]) {
      return message.inlineReply(
        embed.error(
          "You need to input what do you want to buy: `buy Name of the skin`"
        )
      );
    }

    if (profile.skins.includes(args[0])) {
      return message.inlineReply(embed.error("You already have that!"));
    }
    let isIn = false;
    for (const key in skinColors) {
      if (skinColors[key].name == args[0]) {
        isIn = true;
        await buySkin(key, message);
        break;
      }
    }
    if (!isIn) return message.inlineReply(embed.error("Item not found"));

    async function buySkin(newColor, message) {
      const embed = new MessageEmbed()
        .setTitle(`Shop`)
        .setColor("#FF5B5B")
        .setDescription(
          `Buy Skin: ${skinColors[newColor].emoji} ${skinColors[newColor].name}`
        )
        .setImage(skinColors[newColor].url)
        .setFooter("Are you sure about that?")
        .setTimestamp();
      message.channel.send(embed).then((msg) => {
        //?Adiciona as reações
        //?Yes
        msg.react("✅").then((r) => {
          const yesFilter = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === id;
          const yes = msg.createReactionCollector(yesFilter, {
            time: 60000,
          });

          //?No
          msg.react("❌");
          const noFilter = (reaction, user) =>
            reaction.emoji.name === "❌" && user.id === id;
          const no = msg.createReactionCollector(noFilter, {
            time: 60000,
          });

          yes.on("collect", async (r) => {
            if (profile.money < skinColors[newColor].price) {
              return message.inlineReply("❌ - You don't have money");
            }
            await profile.addSkin(skinColors[newColor].name);
            await profile.addMoney(-skinColors[newColor].price);
            return message.inlineReply(`Purchased!`);
          });

          no.on("collect", (r) => {
            return message.inlineReply(`Ok!`);
          });
        });
      });
    }
  },
};
