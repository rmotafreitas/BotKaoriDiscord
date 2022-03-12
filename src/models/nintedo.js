const mongoose = require("mongoose");

const FriendCode = mongoose.Schema({
    userID: String,
    ndsFC: String,
    swFC: String,
});

module.exports = mongoose.model("NintedoFriends", FriendCode);
