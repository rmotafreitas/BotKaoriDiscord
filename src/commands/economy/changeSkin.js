const { MessageEmbed } = require("discord.js");

// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  var skinColors = JSON.parse(JSON.stringify(require("../../skins.json")));
  var user = msg.author;

  var id = user.id;

  Data.findOne(
    {
      userID: user.id,
    },
    async (err, data) => {
      if (err) console.log(err);
      if (!data) {
        msg.reply("Hey, You don't have an account, type: $create ");
      } else {
        let skins = data.skin;

          skins = skins.split("+");
        
        if (!skins.includes(args[0])) return msg.reply("You don't have that skin");

        changeSkin(args[0]);

            function changeSkin(newColor) {
              let i = skins.findIndex((v) => v === newColor);
              skins[i] = skins[0];
              skins[0] = newColor;
              data.skin = skins.join("+");
              data.save().catch((err) => console.log(err));
              msg.channel
                .send(`${user} Done!`)
                .then((msg) => msg.delete({ timeout: 3500 }));
            }
      }
    }
  );
};

module.exports = {
  name: "changeskin",
  section: "💸 Economy",
  help: "Change your economy balance skin",
  usage: "changeskin NameOfSkin",
  execute,
};
