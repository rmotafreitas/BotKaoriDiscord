const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  let sobre = [
    "**❯Dev: BestNessPT#4289**",
    `**❯Command list: $help**\n`,
    `**❯I am in: ${bot.guilds.cache.size} servers**`,
    `**❯Do You like me? [Invite me to your server!](${"https://discord.com/api/oauth2/authorize?client_id=730092279326441574&permissions=8&scope=bot"})**`,
  ];

  let Embed = new MessageEmbed()
    .setAuthor(
      "Kaori Miyazono#5192",
      "https://cdn.discordapp.com/avatars/730092279326441574/12b7f197efcfaee9b8740f80d40fe491.webp?size=256"
    )
    .setTitle("About me! ^^")
    .setThumbnail(
      "https://cdn.discordapp.com/avatars/730092279326441574/12b7f197efcfaee9b8740f80d40fe491.webp?size=256"
    )
    .setDescription(sobre)
    .setColor(`RANDOM`);
  msg.delete().catch((O_o) => {});
  msg.channel.send(Embed);
};

module.exports = {
  name: "info",
  help: "Ele mostra as suas info!",
  execute,
};
