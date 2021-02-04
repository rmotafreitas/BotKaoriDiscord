const getCommands = async (bot) => {
  let categories = [];
  let sections = [];
  const commands = bot.commands;

  for (const i of commands) {
    if (!sections.includes(i[1].section) && i[1].section != undefined)
      sections.push(i[1].section);
  }




  for (i = 0; i < sections.length; i++) {
    let data = new Object();
    const value = [];
    for (const j of commands) {
      if ((j[1].section == sections[i])) {
        value.push(j[1]);
      }
      data = {
        name: sections[i],
        value,
      };
    }
    categories.push(data);
  }
  return categories;
};

module.exports = {
  getCommands,
};
