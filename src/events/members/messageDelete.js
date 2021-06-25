module.exports = async (bot, msg, channel) => {
  bot.snipes.push({
    channel: msg.channel,
    content: msg.content,
    author: msg.author,
    image: msg.attachments.first() ? msg.attachments.first().proxyURL : null,
    date: new Date(),
  });
};
