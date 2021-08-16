const replaceAll = async (txt, oldChar, newChar) => {
    let text = "";

    var index = 0;

    do {
      text = txt.toString().replace(oldChar, newChar);
    } while ((index = txt.toString().indexOf(oldChar, index + 1)) > -1);

    return text;
};

module.exports = {
  replaceAll,
};
