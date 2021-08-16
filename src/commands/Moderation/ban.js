const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban a user",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.channel.send({
        embed: {
          color: "RED",
          title: `Something is Wrong...`,
          description: `😕 Umm... you do not have permission to use this command - \`BAN_MEMBERS\``,
        },
      });
      return;
    }

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      message.channel.send({
        embed: {
          color: "RED",
          title: `Something is Wrong...`,
          description: `😕 Umm... i do not have permission to use this command - \`BAN_MEMBERS\``,
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
          description: `🤔 Umm...i think i can't ban this member`,
        },
      });
      return;
    }
    member.ban({ reason: `${reason || "No Reason"}` }).then(() => {
      message.channel.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `:white_check_mark: Successfully banned ${member.tag}`
          )
      );
    });
  },
};
