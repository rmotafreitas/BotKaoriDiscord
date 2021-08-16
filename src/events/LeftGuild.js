const { client } = require("../index.js");
const prefixs = require("../models/prefixs");

// guildDelete
/* Emitted whenever a guild is deleted/left.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The guild that was deleted    */
client.on("guildDelete", (guild) => {
  prefixs.findOne(
    {
      guildID: guild.id,
    },
    async (err, data) => {
      data.delete();
    }
  );
});
