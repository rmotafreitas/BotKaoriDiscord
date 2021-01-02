const Discord = require("discord.js");
const getHelp = require("../../util/helpDoubt.js").helpDoubt;
const execute = async (bot, msg, args) => {
  if (!msg.member.permissions.has("MANAGE_MESSAGES"))
    return msg.reply(
      "you are weak, you do not have permission to `Manage Messages` to use this command"
    );
  const deleteCount = parseInt(args[0], 10);

  if (!deleteCount || deleteCount < 1 || deleteCount > 99) {
    msg.reply("Provide a number of up to ** 99 messages ** to be deleted");
    getHelp(msg, bot, "clear");
    return;
  }

  const fetched = await msg.channel.messages.fetch({
    limit: deleteCount + 1,
  });
  msg.channel.bulkDelete(fetched);
  msg.delete().catch((O_o) => {});
  msg.channel
    .send(`**${args[0]} clean messages in this chat! **`)
    .catch((error) =>
      console.log(`Não foi possível deletar mensagens devido a: ${error}`)
    );
};

module.exports = {
  name: "clear",
  section: "⚙️ Management",
  help: "Clear messages",
  usage: "clear nºmessage(1-99)",
  execute,
};
