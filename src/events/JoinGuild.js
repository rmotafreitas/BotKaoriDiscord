const { client } = require("../index.js");
const prefixs = require("../models/prefixs");

/* Emitted whenever the client joins a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The created guild    */
client.on("guildCreate", (guild) => {
  const NewGuildPrefix = new prefixs({
    guildID: guild.id,
    prefix: "$",
  });

  NewGuildPrefix.save().catch((err) => console.log(err));
});
