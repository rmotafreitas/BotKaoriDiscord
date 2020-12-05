const ready = async (bot) => {
  console.log(
    `Estou conectado como ${bot.user.username} em ${bot.guilds.cache.size} servidores e users ${bot.users.cache.size}`
  );

  bot.user.setActivity("$help", { type: 3 });
};

module.exports = {
  ready,
};
