const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = async (bot, member) => {
  //guild
  let guilds = [
    bot.guilds.cache.get("730079290221396008"), //Kaoir Bot Server
    bot.guilds.cache.get("729166259924762664"), //Animes Server
    bot.guilds.cache.get("730079290221396008"),
  ]; //IDs SERVER

  let channels = [
    bot.channels.cache.get("730079290221396013"), //Kaoir Bot Server
    bot.channels.cache.get("740921877970550795"), //Animes Server
    bot.channels.cache.get("730079290221396013"),
  ]; //IDs CANAL

  let channel = ["0"]; //ID Canal
  let guild = ["0"]; //ID Server
  let emoji = "<a:chibi_cola:731167866337886249>";

  let welcomeGif = [
    "https://i.pinimg.com/originals/04/dd/db/04dddb24a548c4ce1069513d5cdd4d7a.gif",
    "https://68.media.tumblr.com/8b8a99492ffba7ec6b1e429d2891ee22/tumblr_ohgvn0QWcE1qkz08qo1_540.gif",
    "https://i.pinimg.com/originals/50/eb/47/50eb47c78063d41c26ab6a8556fc3976.gif",
    "https://data.whicdn.com/images/243960123/original.gif",
    "https://data.whicdn.com/images/270710058/original.gif",
  ];

  let gif = welcomeGif[Math.floor(Math.random() * welcomeGif.length)];

  let flag = false;

  guilds.forEach(function (item, index, array) {
    if (guilds[index] != member.guild) {
      return;
    } else {
      flag = true;
      channel = channels[index];
      guild = guilds[index];
    }
  });

  if (flag == true) {
    const embed = new Discord.MessageEmbed()
      .setColor("#DE3B72")
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ size: 4096, dynamic: true })
      )
      .setTitle(`${emoji} WELCOME!`)
      .setImage(gif)
      .setDescription(
        `${member.user}, Welcome to ${guild.name}! member nº ${member.guild.memberCount}`
      )
      .setThumbnail(
        member.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 1024,
        })
      )
      .setFooter("ID: " + member.user.id)
      .setTimestamp();
    await channel.send(embed);

    //Kaori auto role
    if (guild == "730079290221396008") {
      const role = guild.roles.cache.find(
        (role) => role.id === "760610314638590032"
      );
      member.roles.add(role);
    }
    //
  }
};
