const mongoose = require("mongoose");

const question = mongoose.Schema({
  n: Number,
  id: Number,
});

module.exports = mongoose.model("QuestionN", question);
