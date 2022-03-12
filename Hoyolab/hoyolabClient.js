const { get } = require("axios");
const Canvas = require("canvas");
const path = require("path");
const { MessageEmbed } = require("discord.js");
const { numFormatter } = require("../numFormatter");

class hoyolabClient {
  constructor() {}
  async getUIDByNick(query) {
    var flag = false;
    var pageN = 1;
    var uid = null;
    var arrUsers = [];
    do {
      const users = await this.searchUser(query, pageN);
      arrUsers = arrUsers.concat(users.users);
      if (users.uid != null) {
        uid = users.uid;
        break;
      }
      pageN++;
      flag = users.isLast;
    } while (!flag);
    return uid;
  }

  async searchUser(query, pageN = 1) {
    let allUsers = await get(
      `https://bbs-api-os.mihoyo.com/community/search/wapi/search/user?keyword=${query}&page_num=${pageN}&page_size=15`
    );
    query = query.toLocaleLowerCase();
    const users = allUsers.data.data.list;
    const arr = [];
    users.forEach((user) => {
      let nickname = user.user.nickname.replaceAll("<hoyolab>", "");
      nickname = nickname.replaceAll("</hoyolab>", "");
      nickname = nickname.toLocaleLowerCase();
      arr.push({
        nickname,
        uid: user.user.uid,
      });
    });

    const index = arr.findIndex((x) => x.nickname === query);
    const uid = index != -1 ? arr[index].uid : null;

    const isLast = allUsers.data.data.is_last;
    return {
      users: arr,
      isLast,
      uid,
    };
  }

  async getProfileInfo(uid) {
    let user = await get(
      `https://bbs-api-os.mihoyo.com/community/user/wapi/getUserFullInfo?uid=${uid}`
    );
    user = user.data.data.user_info;
    return user;
  }

  async buildCanvas(user) {
    //Vars
    const width = 812;
    const height = 515;

    //Init
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    //Backgournd
    const background = await Canvas.loadImage(
      path.join(__dirname, "..", "..", "assets", "Hoyolab.png")
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Avatar
    const avatar = await Canvas.loadImage(user.avatar_url);
    ctx.drawImage(avatar, 32, 124, 112, 112);

    return canvas.toBuffer();
  }

  async getUserPosts(uid) {
    const arrEmbeds = [];
    let posts = await get(
      `https://bbs-api-os.mihoyo.com/community/post/wapi/userPost?size=15&uid=${uid}`
    );
    posts = posts.data.data.list;
    const user = await this.getProfileInfo(uid);
    if (posts.length == 0) {
      c;
      const embed = new MessageEmbed()
        .setAuthor(user.nickname, user.avatar_url)
        .setColor("RED")
        .setTimestamp()
        .setDescription("❌ This user dosen't have any posts");
      arrEmbeds.push(embed);
      return arrEmbeds;
    }
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];
      const stats = post.stat;
      const video = post.video;
      const type = this.getPostType(post.post);
      post = post.post;
      let time = post.reply_time.split(" ");
      time = time[1].split(":");
      let day = post.reply_time.split(" ");
      day = day[0].split("-");
      let ts;
      ts = new Date(day[0], day[1], day[2], time[0], time[1], time[2], 0);
      const embed = new MessageEmbed()
        .setAuthor(
          `${user.nickname} (${user.achieve.post_num} Posts)`,
          user.avatar_url
        )
        .setColor("BLUE")
        .setURL(`https://www.hoyolab.com/article/${post.post_id}`)
        .setDescription(post.content)
        .setTimestamp(ts)
        .setFooter(
          `${i + 1} / ${posts.length}`,
          "https://img-os-static.hoyolab.com/communityWeb/upload/1ad2c7350a84987913734dd4c48574d4.png"
        );
      if (type == "image") {
        embed.setTitle(`${post.subject} <:imgicon:928687334650683452>`);
        embed.setImage(post.images[0]);
      }
      if (type == "multipleImages") {
        embed.setTitle(
          `${post.subject} <:imgsicon:928687109055844372> [${post.images.length}]`
        );
        embed.setImage(post.images[0]);
      }
      if (type == "video") {
        embed.setTitle(`${post.subject} <:youtube:928682792517242940>`);
        embed.setImage(video.cover);
      }
      if (type == "text") {
        embed.setTitle(`${post.subject} 📝`);
      }
      embed.setDescription(
        `${embed.description}\n\n` +
          `<:Views:928697833962487870> ${numFormatter(
            stats.view_num
          )}\t<:Comments:928696681371959336> ${numFormatter(
            stats.reply_num
          )}\t<:Likes:928696681367748628> ${numFormatter(stats.like_num)}`
      );
      arrEmbeds.push(embed);
    }
    return arrEmbeds;
  }

  getPostType(post) {
    /*
    - text
    - image
    - multipleImages
    - video
    */
    if (post.video) return "video";
    if (post.images.length == 1) return "image";
    if (post.images.length > 1) return "multipleImages";
    if (!post.images.length) return "text";
  }
}

const App = new hoyolabClient();

module.exports = {
  App,
};
