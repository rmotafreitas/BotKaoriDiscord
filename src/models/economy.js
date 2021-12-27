const mongoose = require("mongoose");

const Economy = mongoose.Schema({
    userID: String,
    name: String,
    money: Number,
    beg: Number,
    work: Number,
    daily: Number,
    weekly: Number,
    premium: Boolean,
    badges: Array,
    skins: Array,
    marry: String,
    marryTime: Number,
    rings: Number,
    snake: Number,
    bio: String,
    blocked: Boolean,
    workLevel: Number,
    xp: Number,
});

module.exports = mongoose.model("EconomyDB", Economy);
