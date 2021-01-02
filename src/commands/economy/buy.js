const { MessageEmbed } = require("discord.js");

// MODELS
const Data = require("../../models/data.js");



const execute = async (bot, msg, args) => {
    var user = msg.author;
    var skinColors = JSON.parse(JSON.stringify(require("../../skins.json")));
    Data.findOne(
        {
            userID: user.id,
        },
        async (err, data) => {
            if (err) { console.log(err); return; }
            if (!data) { 
                return msg.reply("Hey, create an account first type: $create"); 
            } else {
                let skins = data.skin;
                if (skins != "normal") {
                    skins = skins.split("+");
                    skins.forEach(function (item, index, array) {
                        skinColors[skins[index]].active = true;
                    });
                }
            }

        }
    )
};

module.exports = {
  name: "name",
  helpAdmin: "help",
  execute,
};