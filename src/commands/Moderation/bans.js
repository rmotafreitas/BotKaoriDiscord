const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "bans",
  aliases: ["allbans"],
  cooldown: 0,
  description: "displays the bans in a server!",
  run: async (client, message, args) => {
    var amount = 1;
    const fetchBans = message.guild.fetchBans();
    const bannedMembers = (await fetchBans)
      .map(
        (member) =>
          `> __${amount++}.__ **${member.user.tag}** | (*${member.user.id}*)`
      )
      .join("\n");
    const bansEmbed = new MessageEmbed()
      .setAuthor(
        `Bans for ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(`${bannedMembers}`)
      .setFooter(`Amount: ${amount - 1}`)
      .setTimestamp()
      .setColor("RED");
    message.channel.send(bansEmbed);
  },
};
