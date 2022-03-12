<<<<<<< HEAD
const rp = require("request-promise");

const getOnlineRadioBoxData = async (url) => {
  var page = await rp(url)
    .then(function (htmlString) {
      return htmlString;
    })
    .catch(function (err) {});
  let location = page.search("cont anim");
  var album = "";
  var tryAlbum = page.substring(location + 74, location + 300);

  for (i = 0; i < tryAlbum.length; i++) {
    if (tryAlbum.charAt(i) == '"') break;
    album += tryAlbum.charAt(i);
  }
  var info = "";
  var tryInfo = page.substring(location + 247, location + 300);
  for (i = 0; i < tryInfo.length; i++) {
    if (tryInfo.charAt(i) == '"') break;
    info += tryInfo.charAt(i);
  }
  const songData = info.split(" - ");
  const data = {
    music: songData[1],
    from: songData[0],
    album: album,
  };

  return data;
};

module.exports = {
  getOnlineRadioBoxData,
};
=======
const rp = require("request-promise");
const replaceAll = require("./replaceAll").replaceAll;

const getOnlineRadioBoxData = async (url) => {
  var page = await rp(url)
    .then(function (htmlString) {
      return htmlString;
    })
    .catch(function (err) {});
  let location = page.search("cont anim");
  var album = "";
  var tryAlbum = page.substring(location + 74, location + 300);

  for (i = 0; i < tryAlbum.length; i++) {
    if (tryAlbum.charAt(i) == '"') break;
    album += tryAlbum.charAt(i);
  }
  var info = "";
  var tryInfo = page.substring(location + 247, location + 300);
  for (i = 0; i < tryInfo.length; i++) {
    if (tryInfo.charAt(i) == '"') break;
    info += tryInfo.charAt(i);
  }
  const songData = info.split(" - ");
  const data = {
    music: songData[1],
    from: songData[0],
    album: album,
  };

  return data;
};

module.exports = {
  getOnlineRadioBoxData,
};
>>>>>>> a696a5962d1952693c8604e1b2f2306a3faebffd
