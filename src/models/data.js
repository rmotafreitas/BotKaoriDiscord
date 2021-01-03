const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  name: String,
  userID: String,
  lb: String,
  money: Number,
  daily: Number,
  say: Boolean,
  skin: String,
  rings: Number,
  waifus: String,
});

module.exports = mongoose.model("Data", dataSchema);
