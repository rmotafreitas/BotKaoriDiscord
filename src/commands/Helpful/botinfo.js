const Discord = require("discord.js");
const getPrefix = require("../../tools/prefix").getPrefix;
const { MessageEmbed } = require("discord.js");
const colors = require("../../colors.json");
const moment = require("moment");
const getUsers = require("../../tools/getNumberOfUsers").getUsers;

const execute = async (bot, msg, args) => {
  const prefix = await getPrefix(msg.member.guild.id);
  const dev = bot.users.cache.get("513113161126248469");
  const devavatar = dev.displayAvatarURL({ size: 4096, dynamic: true });

  const kaori = bot.users.cache.get(bot.user.id);
  const kaoriavatar = kaori.displayAvatarURL({ size: 4096, dynamic: true });

  const users = await getUsers(bot);

  const sobre = [
    "**❯ Command list:** `" + prefix + "help`\n",
    "**Statistics ↗️**",
    `**❯ Servers:** ${bot.guilds.cache.size}`,
    `**❯ Channels:** ${bot.channels.cache.size}`,
    `**❯ Users:** ${users}\n`,
    "**Software ⚙️**",
    `**❯ Size:** 150 Mega`,
    `**❯ Library:** Discord.Js`,
    `**❯ Version Discord.Js:** 12.3.1`,
    `**❯ Version Node.Js:** 12.16.3\n`,
    `**❯ Created at:** ${moment(bot.user.createdTimestamp).format(
      "LT"
    )} ${moment(bot.user.createdTimestamp).format("LL")} ${moment(
      bot.user.createdTimestamp
    ).fromNow()}`,
    //!`**❯ Entry on the server:** ${moment(bot.member.joinedAt).format("LL LTS")}`,
    `\n**Support me 👇**`,
    `<:github:760606165016117298> [Give me a star](${"https://github.com/BestNessPT/BotKaoriDiscord"})`,
    `<:discord:760607139172712520> [Join my server](${"https://discord.gg/wD7T6Ty"})`,
    `<:topggbot:760960068589060106> [Vote me on Top.gg](${"https://top.gg/bot/730092279326441574"})`,
    `💌 [Invite me to your server!](${"https://discord.com/api/oauth2/authorize?client_id=730092279326441574&permissions=8&scope=bot"})`,
  ];

  const Embed = new MessageEmbed()
    .setAuthor("Kaori Miyazono#5192", kaoriavatar)
    .setTitle("About me!")
    .setThumbnail(kaoriavatar)
    .setDescription(sobre)
    .setColor(colors.blue)
    .setFooter(`Dev: ${dev.username}#${dev.discriminator}`, devavatar);
  return msg.channel.send(Embed);
};

module.exports = {
  name: "botinfo",
  help: "Shows the info about the bot",
  section: "⚙️ HelpFul",
  usage: "botinfo",
  example: "botinfo",
  aliases: ['bi'],
  execute,
};
