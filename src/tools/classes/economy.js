const economy = require("../../models/economy");
const { client } = require("../../index");
class economyDB {
  constructor(id) {
    this.userID = id;
    this.name = client.users.cache.get(id).username;
    this.begTimeout = 10800000;
    this.dailyTimeout = 86400000;
    this.workTimeout = 43200000; //12H
    this.weeklyTimeout = 604800000;
    this.money = null;
    this.beg = null;
    this.daily = null;
    this.work = null;
    this.weekly = null;
    this.premium = null;
    this.badges = null;
    this.skins = null;
    this.marry = null;
    this.marryTime = null;
    this.rings = null;
    this.snake = null;
    this.bio = null;
    this.blocked = null;
    this.workLevel = null;
    this.xp = null;
  }

  async init() {
    const id = this.userID;
    const name = this.name;
    let data = await economy.findOne({
      userID: id,
    });
    if (!data) {
      const newProfile = new economy({
        userID: id,
        name: name,
        money: 0,
        beg: 0,
        work: 0,
        daily: 0,
        weekly: 0,
        premium: false,
        badges: [],
        skins: ["default"],
        marry: null,
        marryTime: 0,
        rings: 0,
        snake: 0,
        bio: null,
        blocked: false,
        workLevel: 1,
        xp: 0,
      });
      await newProfile.save().catch((err) => console.log(err));
      this.money = 0;
      this.beg = 0;
      this.daily = 0;
      this.work = 0;
      this.weekly = 0;
      this.premium = false;
      this.badges = [];
      this.skins = ["default"];
      this.marry = null;
      this.marryTime = 0;
      this.rings = 0;
      this.snake = 0;
      this.bio = null;
      this.blocked = false;
      this.workLevel = 1;
      this.xp = 0;
    } else {
      if (name == null) {
        this.name = data.name;
      }
      this.money = data.money;
      this.beg = data.beg;
      this.daily = data.daily;
      this.work = data.work;
      this.weekly = data.weekly;
      this.premium = data.premium;
      this.badges = data.badges;
      this.skins = data.skins;
      this.marry = data.marry;
      this.marryTime = data.marryTime;
      this.rings = data.rings;
      this.snake = data.snake;
      this.bio = data.bio;
      this.blocked = data.blocked;
      this.workLevel = data.workLevel;
      this.xp = data.xp;
    }
  }

  canBeg() {
    if (this.begTimeout - (Date.now() - this.beg) > 0) {
      return false;
    } else {
      return true;
    }
  }

  async begMethod() {
    const id = this.userID;
    let data = await economy.findOne({
      userID: id,
    });
    data.money += 100;
    data.beg = Date.now();
    this.money += 100;
    this.beg = Date.now();
    data.save().catch((err) => console.log(err));
  }

  canWork() {
    if (this.workTimeout - (Date.now() - this.work) > 0) {
      return false;
    } else {
      return true;
    }
  }

  async workMethod() {
    const id = this.userID;
    let data = await economy.findOne({
      userID: id,
    });
    data.money += 400;
    data.work = Date.now();
    this.money += 400;
    this.work = Date.now();
    data.save().catch((err) => console.log(err));
  }

  canDaily() {
    if (this.dailyTimeout - (Date.now() - this.daily) > 0) {
      return false;
    } else {
      return true;
    }
  }

  async dailyMethod() {
    const id = this.userID;
    let data = await economy.findOne({
      userID: id,
    });
    data.money += 800;
    data.daily = Date.now();
    this.money += 800;
    this.daily = Date.now();
    data.save().catch((err) => console.log(err));
  }

  canWeekly() {
    if (this.weeklyTimeout - (Date.now() - this.weekly) > 0) {
      return false;
    } else {
      return true;
    }
  }

  async weeklyMethod() {
    const id = this.userID;
    let data = await economy.findOne({
      userID: id,
    });
    this.money += 5600;
    this.weekly = Date.now();
    data.money += 5600;
    data.weekly = Date.now();
    data.save().catch((err) => console.log(err));
  }

  async addMoney(money) {
    const id = this.userID;
    let data = await economy.findOne({
      userID: id,
    });
    data.money += money;
    data.save().catch((err) => console.log(err));
    this.money += money;
  }

  async setBio(bio) {
    this.bio = bio;
    const id = this.userID;
    let data = await economy.findOne({
      userID: id,
    });
    data.bio = bio;
    data.save().catch((err) => console.log(err));
  }
}

module.exports = {
  economyDB,
};
