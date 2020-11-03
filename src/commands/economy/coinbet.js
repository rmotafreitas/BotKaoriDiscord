// MODELS
const Data = require("../../models/data.js");

const execute = async (bot, msg, args) => {
  var author = msg.author;

  var user = msg.mentions.members.first();

  if (!user) return msg.reply("You need to mention someone!");

  if(user.id == author.id) return msg.reply("You can't bet with yourself");

  if (!args[1]) return msg.reply("You need to bet some money!");
  if (!args[2])
    return msg.reply(
      "You need to say what side of the coin you want `heads` or `tails`"
    );
  
  var flag = true;

  var bet = args[1];
  var side = args[2];

  let sides = ["heads", "tails"];

  var pick = sides[Math.floor(Math.random() * sides.length)];

  if (side != "heads" && side != "tails")
    return msg.reply("You need to pick up `heads` or `tails`");

  if (parseInt(bet) < 1) return msg.reply("You can't bet less than 1$!");

  if (!Number.isInteger(parseInt(bet)))
    return msg.reply("Hey, that's not a number >:(");

  var result;

  if (pick == side) {
    result = "Win";
  } else {
    result = "Lose";
  }

  Data.findOne(
    {
      userID: msg.author.id,
    },
    (err, authorData) => {
      if (err) console.log(err);
      if (!authorData)
        return msg.reply("Hey, create an account first type: $create");
      if (authorData.money == -1) return msg.reply("You are blocked!");
      Data.findOne(
        {
          userID: user.id,
        },
        (err, userData) => {
          if (!userData) return msg.reply("That user dosen't have an account!");

          if (err) console.log(err);

          if (userData.money == -1)
            return msg.reply("Hey this account is Blocked!");

          if (parseInt(bet) > authorData.money)
            return msg.reply("You don´t have that much to bet!");

          if (parseInt(bet) > userData.money)
            return msg.reply("The user don´t have that much to bet!");

          msg.channel
            .send(
              `${author}, want to bet ${bet}$ with ${user}\n${user}, If you accept click on ☑️`
            )
            .then((msg) => {
              msg.react("☑️").then((r) => {
                //filtros
                const checkF = (reaction, users) =>
                  reaction.emoji.name === "☑️" && users.id === user.id;

                const check = msg.createReactionCollector(checkF, {
                  time: 60000,
                });
                check.on("collect", (r) => {
                  if (flag) {
                    flag = false;
                    if (result == "Win") {
                      authorData.money += parseInt(bet);
                      userData.money -= parseInt(bet);
                      authorData.save().catch((err) => console.log(err));
                      userData.save().catch((err) => console.log(err));
                      return msg.channel.send(`${author} You win: ${bet}$\n${user} Lost ${bet}$`);
                    } else {
                      userData.money += parseInt(bet);
                      authorData.money -= parseInt(bet);
                      authorData.save().catch((err) => console.log(err));
                      userData.save().catch((err) => console.log(err));
                      return msg.channel.send(`${user} You win: ${bet}$\n${author} Lost ${bet}$`);
                    }
                  }
                });
              });
            });
        }
      );
    }
  );
};

module.exports = {
  name: "coinflip",
  helpEconomy: "Coinflip, $coinflip @mention money tails or heads",
  execute,
};
