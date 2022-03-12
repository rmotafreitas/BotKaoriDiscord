const { client } = require("../index.js");
const ned = require("../models/ned");
// message
/* Emitted whenever a message is created.
PARAMETER      TYPE           DESCRIPTION
message        Message        The created message    */
client.on("message", async (message) => {
  if (!message.guild || message.author.bot) return;
  ned.findOne(
    {
      ID: message.author.id,
    },
    async (err, user) => {
      if (err) console.error(err);
      if (!user) {
        const newNed = new ned({
          ID: message.author.id,
          Username: message.author.tag,
          Guilds: [
            {
              ID: message.guild.id,
              Name: message.guild.name,
            },
          ],
        });
        await newNed.save().catch((err) => console.log(err));
        console.log("Novo utilizador criado");
      } else {
        const guilds = user.Guilds;
        var flag = false;
        guilds.forEach((value) => {
          if (value.ID == message.guild.id) {
            flag = true;
          }
        });
        if (!flag) {
          console.log("Nova guilda");
          const newGuild = {
            ID: message.guild.id,
            Name: message.guild.name,
          };
          guilds.push(newGuild);
          user.Guilds = guilds;
          await user.save().catch((err) => console.log(err));
        } else {
          console.log("Guilda já existe");
        }
      }
    }
  );
});
