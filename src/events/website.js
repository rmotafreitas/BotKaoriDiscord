const { client } = require("../index");
const express = require("express");
const path = require("path");
const { getCommands } = require("../tools/getCommands");
client.on("ready", async () => {
  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.guilds.cache
      .reduce((a, b) => a + b.memberCount, 0)
      .toLocaleString(),
    channels: client.channels.cache.size,
  };

  const app = express();
  const port = process.env.PORT || 3001;
  app.set("views", path.join(__dirname, "..", "pages", "KaoriWebSite"));
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "..", "pages", "KaoriWebSite")));
  app.get("/", (req, res) => {
    res.status(200).render("index", { clientDetails });
  });

  const commands = getCommands();
  app.get("/commands", (req, res) => {
    res.status(200).render("commands", { commands });
  });
  app.listen(port);
});
