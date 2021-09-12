const { re } = require("mathjs");
const { client } = require("../index.js");

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.guild.id != "710463524177969213") return;
  let msg = message.content;
  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
  if (!emojis) return;
  let ems = [];
  message.guild.emojis.cache.forEach((m) => {
    ems.push(m.name);
  });
  emojis.forEach((m) => {
    let emoji = client.emojis.cache.find((x) => x.name === m);
    if (!emoji) return;
    if (ems.includes(emoji.name)) return;
    let temp = emoji.toString();
    if (new RegExp(temp, "g").test(msg))
      msg = msg.replace(new RegExp(temp, "g"), emoji.toString());
    else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  });

  if (msg === message.content) return;

  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let webhook = await message.channel.fetchWebhooks();
  let number = randomNumber(1, 2);
  webhook = webhook.find((x) => x.name === "KaoriEmojis" + number);

  if (!webhook) {
    webhook = await message.channel.createWebhook(`KaoriEmojis` + number, {
      avatar: client.user.displayAvatarURL({ dynamic: true }),
    });
  }

  await webhook.edit({
    name: message.member.nickname
      ? message.member.nickname
      : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true }),
  });

  message.delete().catch((err) => {});
  webhook.send(msg).catch((err) => {});

  await webhook.edit({
    name: `KaoriEmojis` + number,
    avatar: client.user.displayAvatarURL({ dynamic: true }),
  });
});
