const Discord = require("discord.js");
const execute = async (bot, msg, args) => {
  function name() {
    const sayMessage = args.join(" ");
    msg.delete().catch((O_o) => {});
    msg.channel.send(sayMessage);
  }

  switch (msg.author.tag) {
    case "BestNessPT#4289":
      name();
      break;

    case "Sshadow#5224":
      name();
      break;

    case "Heist✔#9198":
      name();
      break;

    default:
      msg.reply("You are not my creator to speak for me!");
      break;
  }
};

module.exports = {
  name: "say",
  help: "Ele fala uma frase",
  execute,
};
