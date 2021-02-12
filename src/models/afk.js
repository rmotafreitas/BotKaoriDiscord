const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    userID: String,
    guildID: String,
    nickname: String,
    afk: String,
    time: Number
});

module.exports = mongoose.model("Afk", dataSchema);
