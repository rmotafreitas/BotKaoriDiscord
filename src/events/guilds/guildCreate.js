module.exports = async (bot, guild) => {
  console.log(guild.owner);
  bot.channels.cache
    .get("771007046949929040")
    .send(
      `Entrei num server: \n**❯ Nome:** ${guild.name} (${guild.id})\n**❯ Membros:** ${guild.memberCount}\n=======`
    );
  //Your other stuff like adding to guildArray, guild.owner.user.tag,
  //bot.users.cache.get(guild.owner.user.id).send("**Hey, thx for add me to your server!\nPls join my support server: https://discord.gg/wD7T6Ty\nRead my guidelines to avoid problems**");
};

