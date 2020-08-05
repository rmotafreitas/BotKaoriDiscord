const Discord = require("discord.js");
const fs = require("fs");
const money = require("../../DataBase/economy/money.json");
const ms = require("parse-ms");
const cooldowns = require("../../DataBase/economy/cooldowns.json");
const { MessageEmbed } = require("discord.js");
const { time } = require("console");
const execute = async (bot, msg, args) => {
  let timeout = 86400000;
  let reward = 100;
  let embed = new MessageEmbed();
  embed.setTitle("Work reward");

  if (!money[msg.author.id]) {
    return msg.channel.send(
      "You don't have an account, create one! Type: $create "
    );
  } else {
    if (!cooldowns[msg.author.id]) {
      cooldowns[msg.author.id] = {
        name: bot.users.cache.get(msg.author.id).tag,
        daily: Date.now(),
      };

      fs.writeFile(
        "./src/DataBase/economy/cooldowns.json",
        JSON.stringify(cooldowns),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      money[msg.author.id].money += reward;
      fs.writeFile(
        "./src/DataBase/economy/money.json",
        JSON.stringify(money),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      embed.setDescription(
        `You earn $${reward}. Current balance: $${money[msg.author.id].money} .`
      );
      embed.setColor(`RANDOM`);
      return msg.channel.send(embed);
    } else {
      if (timeout - (Date.now() - cooldowns[msg.author.id].daily) > 0) {
        let time = ms(timeout - (Date.now() - cooldowns[msg.author.id].daily));

        embed.setColor(`RANDOM`);
        embed.setDescription("**You already worked today!**");
        embed.addField(
          `Work again in:`,
          `**${time.hours}h  ${time.minutes}m ${time.seconds}s**`
        );
        return msg.channel.send(embed);
      } else {
        money[msg.author.id].money += reward;
        fs.writeFile(
          "./src/DataBase/economy/money.json",
          JSON.stringify(money),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        cooldowns[msg.author.id].daily = Date.now();
        fs.writeFile(
          "./src/DataBase/economy/cooldowns.json",
          JSON.stringify(cooldowns),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        embed.setDescription(
          `You earn $${reward}. Current balance: $${
            money[msg.author.id].money
          } .`
        );
        embed.setColor(`RANDOM`);
        return msg.channel.send(embed);
      }
    }
  }
};

module.exports = {
  name: "work",
  help: "daily commnad to economy",
  execute,
};
