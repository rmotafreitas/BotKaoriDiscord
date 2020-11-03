

// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  if (
    msg.author.id == "513113161126248469" ||
    msg.author.id == "404383511156621312"
  ) {
    if (!args[0]) {
      return msg.reply("Hey Ness u forgot to mention >:( ! ");
    } else {
      var user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
    }
    Data.findOne(
      {
        userID: user.id,
      },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          return msg.reply("Hey, the person don't have an account");
        } else {
          data.money = -1;
          data.save().catch((err) => console.log(err));
          return msg.reply("Blocked!");
        }
      }
    );
  } else {
    msg.reply("Hey, you are not my Dev!");
  }
};

module.exports = {
  name: "block",
  helpAdmin: "Block an economy account (admin)",
  execute,
};
