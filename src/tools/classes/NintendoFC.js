const nintedo = require("../../models/nintedo");

class NintedoFC {
  constructor(id) {
    this.ndsFC = null;
    this.swFC = null;
    this.userID = id;
  }

  async init() {
    const id = this.userID;
    let data = await nintedo.findOne({
      userID: id,
    });
    if (!data) {
      const newProfile = new nintedo({
        userID: id,
        ndsFC: null,
        swFC: null,
      });
      await newProfile.save().catch((err) => console.log(err));
      this.ndsFC = null;
      this.swFC = null;
    } else {
      this.ndsFC = data.ndsFC;
      this.swFC = data.swFC;
    }
  }

  async setndsFC(code) {
    this.ndsFC = code;
    let data = await nintedo.findOne({
      userID: this.userID,
    });
    data.ndsFC = code;
    data.save().catch((err) => console.log(err));
  }

  async setswFC(code) {
    this.swFC = code;
    let data = await nintedo.findOne({
      userID: this.userID,
    });
    data.swFC = code;
    data.save().catch((err) => console.log(err));
  }
}

module.exports = {
  NintedoFC,
};
