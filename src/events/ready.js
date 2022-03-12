const { client } = require("../index");
const activities = require("../json/pfp_states.json").states;
client.on("ready", async () => {
  console.log(`${client.user.username} is online :)`);
  client.user.setActivity("Ping me!");
  /* Types
  0 - Playing
  1 - Live
  2 - Listening
  3 - Watching
  */
});
