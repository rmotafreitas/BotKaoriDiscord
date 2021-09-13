const { client } = require("../index");

client.on("ready", async () => {
  console.log(`${client.user.username} is online :)`);

  client.user.setActivity("Try my commands, ping me!", { type: 3 });
});
