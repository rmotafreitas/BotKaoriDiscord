const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
    name: 'triggered',
    cooldown: 2,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trigger(avatar);
        let attachment = new MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);
    }
}