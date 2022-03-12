const axios = require("axios");
async function getAnimuFmData() {
  const music = await axios.get(`https://api.animu.com.br/?t=${Date.now()}`);
  return music.data.track;
}

module.exports = {
    getAnimuFmData,
};
