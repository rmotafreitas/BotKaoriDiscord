function getXmlProp(xml, prop) {
  const lines = xml.split("\n");
  lines.splice(0, 1);
  xml = lines.join("\n");
  xml = xml.replaceAll(/\s/g, "");
  const location = xml.search("a");
  console.log({ xml, location });
  const tryProp = xml.substring(location + prop.length, location + xml.length);
  let _prop = "";
  for (i = 0; i < tryProp.length; i++) {
    if (tryProp.charAt(i) == "<") break;
    _prop += tryProp.charAt(i);
  }
  return _prop;
}

module.exports = {
  getXmlProp,
};
