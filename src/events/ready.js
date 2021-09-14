const { client } = require("../index");
const activities = require("../json/pfp_states.json").states;
client.on("ready", async () => {
  console.log(`${client.user.username} is online :)`);
   // run every 4.5 seconds
   setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];
    client.user.setActivity(newActivity.state);
    client.user.setAvatar(newActivity.img);
  }, 5*60*1000);
  /* Types
  0 - Playing
  1 - Live
  2 - Listening
  3 - Watching
  */
});
