const mongoose = require("mongoose");

const Ned = mongoose.Schema({
  ID: String,
  Username: String,
  Guilds: [{ ID: String, Name: String, XP: Number, Level: Number }],
});
module.exports = mongoose.model("ned", Ned);
