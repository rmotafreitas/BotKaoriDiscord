const { Client, Message, MessageEmbed } = require("discord.js");
const { re } = require("mathjs");
const colors = require("../../json/colors.json");

module.exports = {
  name: "disconnect",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.voice.channel) return message.inlineReply("You need to be on a voice channel");
    if(!message.guild.me.voice.channel) return message.inlineReply("I am not playing anime radio");
    if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.inlineReply("We need to be in the same voice channel");
    message.guild.me.voice.channel.leave();
    message.inlineReply("Radio Stopped ⭕");
  },
};
