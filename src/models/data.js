const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  name: String,
  userID: String,
  ld: String,
  money: Number,
  daily: Number,
});

module.exports = mongoose.model("Data", dataSchema);
