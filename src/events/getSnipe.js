const { client } = require("../index.js");
const { snipes } = require('../Collection');

client.on("messageDelete", (message) => {
  snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    member: message.member,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
});
