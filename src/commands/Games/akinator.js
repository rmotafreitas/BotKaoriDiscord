const { MessageEmbed } = require("discord.js"),
  { Aki } = require("aki-api"),
  emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"],
  Started = new Set();
module.exports = {
  name: "akinator",
  aliases: ["aki"],
  description: "akinator cmd",
  async run(client, message, args) {
    const sendMsg = await message.channel.send("⚙ Loading...");
    const aki = new Aki("en");
    await aki.start();
    sendMsg.delete();
    const msg = await message.channel.send(
      new MessageEmbed()
        .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
        .setColor(10181046)
        .setDescription(
          `**${aki.question}**\n${aki.answers
            .map((x, i) => `${x} | ${emojis[i]}`)
            .join("\n")}`
        )
    );
    for (let emoji of emojis) await msg.react(emoji).catch(console.error);
    const collector = msg.createReactionCollector(
      (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id === message.author.id,
      { time: 60000 * 6 }
    );
    collector.on("collect", async (reaction, user) => {
      reaction.users.remove(user).catch(console.error);
      if (reaction.emoji.name == "❌") return collector.stop();

      await aki.step(emojis.indexOf(reaction.emoji.name));
      if (aki.progress >= 70 || aki.currentStep >= 78) {
        await aki.win();
        collector.stop();
        message.channel.send(
          new MessageEmbed()
            .setTitle("Is this your character?")
            .setDescription(
              `**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`
            )
            .setImage(aki.answers[0].absolute_picture_path)
            .setColor(10181046)
        );
        message.channel
          .awaitMessages(
            (response) =>
              ["yes", "y", "no", "n"].includes(
                response.content.trim().toLowerCase()
              ) && response.author.id == message.author.id,
            { max: 1, time: 30000, errors: ["time"] }
          )
          .then((collected) => {
            const content = collected.first().content.trim().toLowerCase();
            if (content == "y" || content == "yes")
              return message.channel.send(
                new MessageEmbed()
                  .setColor(10181046)
                  .setTitle("Great! Guessed right one more time.")
                  .setDescription("I enjoyed playing with you!")
              );
            else
              return message.channel.send(
                new MessageEmbed()
                  .setColor(10181046)
                  .setTitle("Uh. you are win")
                  .setDescription("I enjoyed playing with you!")
              );
          });
        return;
      }
      msg.edit(
        new MessageEmbed()
          .setTitle(
            `${message.author.username}, Question ${aki.currentStep + 1}`
          )
          .setColor(10181046)
          .setDescription(
            `**${aki.question}**\n${aki.answers
              .map((x, i) => `${x} | ${emojis[i]}`)
              .join("\n")}`
          )
      );
    });

    collector.on("end", () => {
      Started.delete(message.author.id);
      msg.delete({ timeout: 1000 }).catch(() => {});
    });
  },
};
