const convert = async (bytes) => {
  let formatos = ["B", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0B";
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i <= 2) return Math.round(bytes / Math.pow(1024, i), 2) + formatos[i];
  if ((bytes / Math.pow(1024, i)).toFixed(3).includes(".00"))
    return Math.round(bytes / Math.pow(1024, i), 2) + formatos[i];
  if ((bytes / Math.pow(1024, i)).toFixed(3).includes(".0"))
    return ((bytes / Math.pow(1024, i)).toFixed(3) + formatos[i]).replace(
      "0",
      ""
    );
  return (bytes / Math.pow(1024, i)).toFixed(3) + formatos[i];
};

module.exports = {
  convert,
};
