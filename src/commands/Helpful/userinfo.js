const Discord = require("discord.js");
const moment = require("moment");
const colors = require("../../colors.json");
const { MessageEmbed } = require("discord.js");
const flags = {
  DISCORD_EMPLOYEE: "Discord Employee",
  DISCORD_PARTNER: "Discord Partner",
  BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
  BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
  HYPESQUAD_EVENTS: "HypeSquad Events",
  HOUSE_BRAVERY: "<:Bravery:734515839180603413>",
  HOUSE_BRILLIANCE: "<:Brilliance:734515799238246462>",
  HOUSE_BALANCE: "<:Balance:734515830913630329>",
  EARLY_SUPPORTER: "Early Supporter",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "Verified Bot",
  VERIFIED_DEVELOPER: "Verified Bot Developer",
};
const execute = async (bot, msg, [target]) => {
  const member =
    msg.mentions.members.last() ||
    msg.guild.members.cache.get(target) ||
    msg.member;
  const roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString())
    .slice(0, -1);
  const userFlags = member.user.flags.toArray();

  //! I don't have the presence intetn yet; SAD
  const activity =
    member.user.presence.activities.find((s) =>
      ["PLAYING", "WATCHING", "LISTENING"].includes(s.type)
    ) || "Nothing";
  let state;
  switch (member.user.presence.status) {
    case "online":
      state = "<:online:734891023657992394>";
      break;
    case "dnd":
      state = "<:dnd:734891023729295421>";
      break;
    case "offline":
      state = "<:off:734891023951724564>";
      break;
    case "idle":
      state = "<:idle:734891023930491012> ";
      break;
  }
  //! ===================================

  const emebed = new MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setDescription(
      "**User**\n" +
        `**❯ Name:** ${member.user.username}\n` +
        `**❯ Tag:** ${member.user.discriminator}\n` +
        `**❯ ID:** ${member.id}\n` +
        `**❯ Flags:** ${
          userFlags.length
            ? userFlags.map((flag) => flags[flag]).join(", ")
            : "None"
        }\n` +
        `**❯ Avatar:** [Download](${member.user.displayAvatarURL({
          dynamic: true,
          format: "png",
        })})\n` +
        `**❯ Created at:** ${moment(member.user.createdTimestamp).format(
          "LT"
        )} ${moment(member.user.createdTimestamp).format("LL")} ${moment(
          member.user.createdTimestamp
        ).fromNow()}\n\n` +
        "**Member**\n" +
        `**❯ Higher role:** ${
          member.roles.highest.id === msg.guild.id
            ? "None"
            : member.roles.highest
        }\n` +
        `**❯ Entry:** ${moment(member.joinedAt).format("LL LTS")}\n` +
        `**❯ Higher hoist role:** ${
          member.roles.hoist ? member.roles.hoist : "None"
        }\n` +
        `**❯ Roles:** ${member.roles.cache
          .map((role) => role.toString())
          .join(",")}\n`
    )
    .setFooter(
      `• Author: ${msg.author.tag}`,
      msg.author.displayAvatarURL({ dynamic: true, size: 1024 })
    )
    .setColor(colors.blue);
  return msg.channel.send(emebed);
};

module.exports = {
  name: "userinfo",
  help: "Show an info from a mentioned user or your info",
  section: "⚙️ HelpFul",
  usage: "info <@mention>",
  example: "userinfo",
  execute,
};
