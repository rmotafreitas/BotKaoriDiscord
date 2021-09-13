const { MessageEmbed } = require("discord.js");
const colors = require('../../json/colors.json')
class fastEmbed {
  constructor() {}
  error(error) {
    const errorEmbed = new MessageEmbed()
      .setColor(colors.red)
      .setTitle("Error")
      .setTimestamp()
      .setDescription(error);
    return errorEmbed;
  }
  completed(message) {
    const completedEmbed = new MessageEmbed()
      .setColor(colors.green)
      .setTitle("Completed")
      .setTimestamp()
      .setDescription(message);
    return completedEmbed;
  }
  win(message) {
    const winEmbed = new MessageEmbed()
      .setColor(colors.yellow)
      .setTitle("You win")
      .setDescription(message)
      .setThumbnail("https://c.tenor.com/HAGXdX-X-1cAAAAM/no1-happy.gif")
      .setTimestamp();
    return winEmbed;
  }
  lose(message) {
    const winEmbed = new MessageEmbed()
      .setColor(colors.yellow)
      .setTitle("You lost")
      .setDescription(message)
      .setThumbnail("https://c.tenor.com/uCkIVqpPddUAAAAM/loser.gif")
      .setTimestamp();
    return winEmbed;
  }
}

const embed = new fastEmbed();

module.exports = {
    embed,
};
