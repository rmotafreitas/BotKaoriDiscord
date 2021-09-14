const { Client, Message, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const colors = require("../../json/colors.json");

module.exports = {
  name: "help",
  category: "Info",
  description: "Returns the help menu of the bot",
  cooldown: 1000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const prefix = client.prefix;

    if (!args[0]) {
      let categories = [];

      const dirEmojis = {
        Nintendo: "<:3ds:875025197848211508>",
        Bot: "🤖",
        AnimeList: "<:mal:830006665709486100>",
        Nsfw: "⛔",
        Games: "🕹️",
        Interactions: "<:reactions:830080726514139148>",
        Moderation: "👮",
        Animals: "🐱",
        Utils: "🖨️",
        Music: "🎵",
        Anime: "<a:anime:831476172294324225>",
        Pokemon: "<:pokebola:829671918290468864>",
        Fun: "🥳",
        Info: "📃",
        Math: "📌",
        Misc: "👀",
        Economy: "💰",
      };

      readdirSync("./src/commands/").forEach((dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands
          .filter((command) => {
            let file = require(`../../commands/${dir}/${command}`);
            return !file.hidden;
          })
          .map((command) => {
            let file = require(`../../commands/${dir}/${command}`);

            if (!file.name) return "No command name.";

            let name = file.name.replace(".js", "");

            return `\`${name}\``;
          });

        let data = new Object();

        data = {
          name: dirEmojis[dir] + " " + dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setColor(colors.blue)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ping\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(colors.blue);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor(colors.blue);
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .addField("USAGE:", [
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``,
          "__Remove brackets when typing commands__",
          "> [] = required",
          "> {} = optional",
        ])
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(colors.blue);
      return message.channel.send(embed);
    }
  },
};
