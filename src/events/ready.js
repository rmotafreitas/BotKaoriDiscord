const { client } = require("../../src/index");

client.on("ready", async () => {
  console.log(`${client.user.username} is online :)`);
});
