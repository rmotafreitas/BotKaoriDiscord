const { readdirSync } = require("fs");
const path = require("path");

function getCommands() {
  let categories = [];
  let value = [];
  readdirSync("./src/commands/").forEach((dir) => {
    const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    value = [];
    for (let file of commands) {
      let pull = require(path.resolve(`./src/commands/${dir}/${file}`));
      value.push({
        name: pull.name ? pull.name : "no command name",
        description: pull.description ? pull.description : "no description",
        usage: pull.usage ? pull.usage : pull.name,
        aliases: pull.aliases ? pull.aliases : "no aliases",
      });
    }
    let data = new Object();
    data = {
      name: dir.toUpperCase(),
      value,
    };
    categories.push(data);
  });
  return categories;
}

module.exports = {
  getCommands,
};
