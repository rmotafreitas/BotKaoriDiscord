const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
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
  const sv = msg.content.slice(process.env.PREFIX.length).split(" ");
  if (sv[1] === "server") {
    //info server!
    const level = ["None", "Low", "Medium", "High", "Max"];
    let description = [
      "**Server**",
      `**❯Nome: **` + msg.guild.name,
      `**❯Fundador: **` + msg.guild.owner.user.tag,
      `**❯ID: **` + msg.guild.id,
      `**❯ Avatar:** [Baixar](${msg.guild.iconURL({
        dynamic: true,
      })})`,
      `**❯Membros: **` + msg.guild.memberCount,
      `**❯Bots: **` +
        msg.guild.members.cache.filter((mem) => mem.user.bot === true).size,
      `**❯Cargos: **` + msg.guild.roles.cache.size,
      `**❯Nivel de segurança: **` + msg.guild.verificationLevel,
      `**❯Criação: **` +
        moment.utc(msg.guild.createdAt).format("dddd, MMMM, Do, YYYY"),
      `**❯Online: **` +
        msg.guild.members.cache.filter(
          (mem) => mem.user.presence.status != "offline"
        ).size,
    ];

    const emebed = new MessageEmbed()
      .setThumbnail(msg.guild.iconURL())
      .setColor("RANDOM")
      .setDescription(description);

    msg.channel.send(emebed);
    return;
  }

  const member =
    msg.mentions.members.last() ||
    msg.guild.members.cache.get(target) ||
    msg.member;

  const roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString())
    .slice(0, -1);
  const userFlags = member.user.flags.toArray();
  let activity =
    member.user.presence.activities.find((s) =>
      ["PLAYING", "WATCHING", "LISTENING"].includes(s.type)
    ) || "Nada";
  switch (member.user.presence.activities) {
    case "PLAYING":
  }
  let estado;
  switch (member.user.presence.status) {
    case "online":
      estado = "<:online:734891023657992394>";
      break;
    case "dnd":
      estado = "<:dnd:734891023729295421>";
      break;
    case "offline":
      estado = "<:off:734891023951724564>";
      break;
    case "idle":
      estado = "<:idle:734891023930491012> ";
      break;
  }

  let info = [
    "**User**",
    `**❯ Nome:** ${member.user.username}`,
    `**❯ Tag:** ${member.user.discriminator}`,
    `**❯ ID:** ${member.id}`,
    `**❯ Flags:** ${
      userFlags.length
        ? userFlags.map((flag) => flags[flag]).join(", ")
        : "None"
    }`,
    `**❯ Avatar:** [Baixar](${member.user.displayAvatarURL({
      dynamic: true,
    })})`,
    `**❯ Criado:** ${moment(member.user.createdTimestamp).format(
      "LT"
    )} ${moment(member.user.createdTimestamp).format("LL")} ${moment(
      member.user.createdTimestamp
    ).fromNow()}`,
    `**❯ Estado:** ${estado}`,
    `**❯ Estado custom:** ${
      !member.user.presence.activities[0]
        ? "Nada"
        : member.user.presence.activities[0].type == "CUSTOM_STATUS"
        ? member.user.presence.activities[0].state
        : "Nada"
    }`,
    `**❯ Atividade:** ${activity}`,
    "",
    "**Membro**",
    `**❯ Cargo maior:** ${
      member.roles.highest.id === msg.guild.id
        ? "None"
        : member.roles.highest.name
    }`,
    `**❯ Entrada:** ${moment(member.joinedAt).format("LL LTS")}`,
    `**❯ Cargo com mais poder:** ${
      member.roles.hoist ? member.roles.hoist.name : "None"
    }`,
    `**❯ Cargos:** ${member.roles.cache
      .map((role) => role.toString())
      .join(",")}`,
  ];

  const emebed = new MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))

    .setColor("RANDOM")
    .setDescription(info);
  msg.channel.send(emebed);
};

module.exports = {
  name: "infos",
  help: "Ele mostra as info de um user",
  execute,
};
