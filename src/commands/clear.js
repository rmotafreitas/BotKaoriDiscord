const Discord = require("discord.js");

const execute = async (bot, msg, args) => {
  if (!msg.member.permissions.has("MANAGE_MESSAGES"))
    return msg.reply(
      "você é fraco, lhe falta permissão de `Gerenciar Mensagens` para usar esse comando"
    );
  const deleteCount = parseInt(args[0], 10);

  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return msg.reply(
      "forneça um número de até **99 mensagens** a serem excluídas"
    );

  const fetched = await msg.channel.messages.fetch({
    limit: deleteCount + 1,
  });
  msg.channel.bulkDelete(fetched);
  msg.delete().catch((O_o) => {});
  msg.channel
    .send(`**${args[0]} mensagens limpas nesse chat!**`)
    .catch((error) =>
      console.log(`Não foi possível deletar mensagens devido a: ${error}`)
    );
};

module.exports = {
  name: "clear",
  help: "Ele limpa msg. 1-99!",
  execute,
};
