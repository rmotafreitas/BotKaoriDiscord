const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kick a user",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.channel.send({
        embed: {
          color: "RED",
          title: `Something is Wrong...`,
          description: `😕 Umm... you do not have permission to use this command - \`KICK_MEMBERS\``,
        },
      });
      return;
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      message.channel.send({
        embed: {
          color: "RED",
          title: `Something is Wrong...`,
          description: `😕 Umm... i do not have permission to use this command - \`KICK_MEMBERS\``,
        },
      });
      return;
    }

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ");

    if (!member) {
      message.channel.send({
        embed: {
          color: "RED",
          title: `Something is Wrong...`,
          description: `🤔 Umm...i can't find a member`,
        },
      });
      return;
    }

    if (member.id === message.author.id || client.user.id) {
      message.channel.send({
        embed: {
          color: "RED",
          title: `Something is Wrong...`,
          description: `🤔 Umm...i think i can't kick this member`,
        },
      });
      return;
    }
    member.kick({ reason: `${reason || "No Reason"}` }).then(() => {
      message.channel.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `:white_check_mark: Successfully kicked ${member.tag}`
          )
      );
    });
  },
};
