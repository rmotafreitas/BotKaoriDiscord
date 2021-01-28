const mongoose = require("mongoose");

const ModWarnSchema = mongoose.Schema({
  userID: String,
  guildID: String,
  Punishments: Array
});

module.exports = mongoose.model("warn", ModWarnSchema);
