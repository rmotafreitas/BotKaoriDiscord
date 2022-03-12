const retribution = async (EmbedStructure, emoji, persons, message, action) => {
  persons.reverse();
  const ActionEmbed = Object.create(EmbedStructure);
  ActionEmbed.setDescription(`${persons[0]} ${action} ${persons[1]}`);

  let messageEmbed = await message.channel.send(ActionEmbed);
  messageEmbed.react(emoji);

  const filter = (reaction, user) => {
    return [emoji].includes(reaction.emoji.name) && user.id === persons[1].id;
  };

  messageEmbed
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === emoji && !persons[1].bot) {
        return retribution(EmbedStructure, emoji, persons, message, action);
      }
    })
    .catch((collected) => {});
};

module.exports = {
  retribution,
};
