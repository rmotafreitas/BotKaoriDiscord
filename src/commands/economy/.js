if (!args[0]) {
  var user = msg.author;
} else {
  var user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
}
var pos = 0;
Data.find({
  serverID: msg.guild.id,
})
  .sort([["exp", "descending"]])
  .exec((err, res) => {
    let pg = parseInt(args[0]);
    if (pg != Math.floor(pg)) pg = 1;
    if (!pg) pg = 1;
    let end = pg * 10;
    let start = pg * 10 - 10;
    if (err) console.log(err);
    if (res.length === 0) {
      for (i = start; i < res.length; i++) {
        console.log(res[i]);
        if (user.id === res[i].userID) {
          pos = i + 1;
        }
      }
    } else {
      for (i = start; i < end; i++) {
        console.log(res[i]);
        if (user.id === res[i].userID) {
          pos = i + 1;
        }
      }
    }

    return msg.channel.send(`${user.name} = Rank Nº${pos}`);
  });
