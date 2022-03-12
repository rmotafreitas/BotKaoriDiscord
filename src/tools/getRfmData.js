const rp = require("request-promise");
const { getXmlProp } = require("./getXmlProp");

async function getRfmData() {
  const xml = await rp(
    "https://configsa01.blob.core.windows.net/rfm/rfmOnAir.xml"
  )
    .then(function (htmlString) {
      return htmlString.toString();
    })
    .catch(function (err) {});
  const name = getXmlProp(xml, "name");
  console.log(name);
}

module.exports = {
  getRfmData,
};
