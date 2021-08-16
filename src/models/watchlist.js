const mongoose = require("mongoose");

const animeList = mongoose.Schema({
    userID: String,
    nickname: String,
    watching: Array,
    completed: Array,
    onHold: Array,
    dropped: Array,
    toWatch: Array
});

module.exports = mongoose.model("AnimeList", animeList);
