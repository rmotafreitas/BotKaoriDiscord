async function verification(msg, id) {
  const emoji = "✅";
  msg.react(emoji);
  const filter = (reaction, user) => {
    return [emoji].includes(reaction.emoji.name) && user.id === id;
  };

  const flag = messageEmbed
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();
      return true;
    })
    .catch((collected) => {
      return false;
    });
  return flag;
}

module.exports = {
  verification,
};
