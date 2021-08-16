const getUser = async (client ,message, args) => {
    if (!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.users.first() || client.users.cache.get(args[0]);
    }
    return user;
};

module.exports = {
    getUser,
};
