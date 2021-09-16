const axios = require("axios");
async function getStereo_animeData() {
  let music = await axios.get(
    "https://evcast.mediacp.eu:1680/api/v2/history/"
  );
  music = music.data[0];

  const progress = Date.now() - music.ts;

  const data = {
    title: music.title,
    author: music.author,
    img: music.img_large_url || "https://evcast.mediacp.eu:1680/media/widgets/bannerStereo_livestream_copy_GkuplY0.png",
    progress,
    length: music.length,
  };
  return data;
};

module.exports = {
  getStereo_animeData,
};
