const rp = require("request-promise");
const replaceAll = require("./replaceAll").replaceAll;

const getOnlineRadioBoxData = async (url) => {
  var page = await rp(url)
    .then(function (htmlString) {
      return htmlString;
    })
    .catch(function (err) {});
  var a = page.search("Live");
  var b = page.substring(a + 25, a + 200);
  var link = "";
  if (b.includes("href")) {
    b = page.substring(a + 31, a + 200);
    console.log(b)
    for (i = 0; i < b.length; i++) {
      if (b.charAt(i) == '"') break;
      link += b.charAt(i);
    }

    link = `https://onlineradiobox.com${link}`;
    console.log(link);
    a = b.search(">");
    b = b.substring(a + 1, a + 50);
    var names = "";
    for (i = 0; i < b.length; i++) {
      if (b.charAt(i) == "<") break;
      names += b.charAt(i);
    }
  } else {
    b = page.substring(a + 25, a + 200);
    console.log(b)
    var names = "";
    for (i = 0; i < b.length; i++) {
      if (b.charAt(i) == "<") break;
      names += b.charAt(i);
    }
    //console.log(names)
  }


  names = names.split(" - ");

  var albumImg = "";
  if (link != "") {
    page = await rp(link)
      .then(function (htmlString) {
        return htmlString;
      })
      .catch(function (err) {});

    a = page.search("subject__cover--album");
    b = page.substring(a + 25, a + 400);
    a = b.search("src");
    b = b.substring(a + 5, a + 200);

    for (i = 0; i < b.length; i++) {
      if (b.charAt(i) == '"') break;
      albumImg += b.charAt(i);
    }
  }
  const data = {
    link,
    songName: "a",//await replaceAll(names[1], "&#39;", "'"),
    author: names[0],
    albumImg,
  };
  return data;
};

module.exports = {
  getOnlineRadioBoxData,
};
