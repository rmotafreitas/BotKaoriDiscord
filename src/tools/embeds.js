const { MessageEmbed } = require("discord.js");
const colors = require("../json/colors.json");

const embeds = async (id) => {
  function error(err) {
    const errorEmbed = new MessageEmbed()
      .setColor(colors.red)
      .setTitle("Error")
      .setTimestamp()
      .setDescription(err);
    return errorEmbed;
  }

  function completed(comp) {
    const completedEmbed = new MessageEmbed()
      .setColor(colors.green)
      .setTitle("Completed")
      .setTimestamp()
      .setDescription(comp);
    return completedEmbed;
  }


  const Embeds = {
    error: error,
    completed: completed,
  };

  return Embeds;
};

module.exports = {
  embeds,
};
