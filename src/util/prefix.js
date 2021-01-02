const firebase = require("firebase");
const database = firebase.database();

const getPrefix = async (id) => {
  var p;
   p = await database
    .ref(`Servidores/Levels/${id}/Config`)
    .once("value")
    .then(async function (db) {
      p = db.val().prefix;
      return p;
    });
    return p;
};

module.exports = {
  getPrefix,
};
