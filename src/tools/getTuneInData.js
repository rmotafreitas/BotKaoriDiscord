const rp = require("request-promise");
const getTuneInData = async (url) => {
  var page = await rp(url)
    .then(function (htmlString) {
      return htmlString;
    })
    .catch(function (err) {});
  const location = page.search("H-m");
  var songData = "";
  var trySongName = page.substring(location + 10, location + 100);
  for (i = 0; i < trySongName.length; i++) {
    if (trySongName.charAt(i) == "<") break;
    songData += trySongName.charAt(i);
  }
  songData = songData.split(" - ");

  const data = {
    music: songData[1] != undefined ? songData[1] : "Music",
    from: songData[0],
  };
  return data;
};

module.exports = {
  getTuneInData,
};
