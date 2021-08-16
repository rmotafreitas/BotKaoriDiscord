const mongoose = require("mongoose");

const prefixs = mongoose.Schema({
    guildID: String,
    prefix: String,
});

module.exports = mongoose.model("Prefix", prefixs);
