const guildDelete = async (bot, guild) => {
  bot.channels.cache
    .get("771007046949929040")
    .send(
      `Sai de um server: \n**❯ Nome:** ${guild.name} (${guild.id})\n**❯ Membros:** ${guild.memberCount}\n=======`
    );
};

module.exports = {
  guildDelete,
};
