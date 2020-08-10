const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const execute = async (bot, msg, args) => {
  let names = [
    "Sakurajima Mai | Bunny senpai",
    "Futaba Rio | Bunny senpai", //erro no gif
    "Modeus | Healthtaker",
    "Satan | Healthtaker",
    "Shiro | No game no life",
    "Kaguya | Love is war",
    "Chika | Love is war",
    "Hayasaka | Love is war",
    "Mikazuki | Boku wa tomodachi", //erro no gif
    "Asuna | Sword art Online",
    "Kaori Miyazono | Kimi no uso",
    "Mizuhara | Rent a girlfriend",
    "Zero Two | Darling in Franxx",
    "Rem | Re:zero",
    "Nezuko | Kimetsu no yaba",
    "Shoko Makinohara | Bunny senpai",
    "Kaede | Bunny senpai",
    "Violet | Violet evergarden",
    "Miku | Quintessential quintuplets",
    "Itsuki Nakano | Quintessential quintuplets",
    "Erina | Food Wars",
    "Erina pendleton | Jojo",
    "Serna | Pokémon Xy",
    "Mai | Pokémon Oras",
    "Mei Misaki | Another",
    "Tomoyo Sakagami | Clannad",
    "Nao Tomori | Charlotte",
    "Saigiri | Eromanga sensei",
    "Natsuki | DDLC",
    "Saori | Saint Seiya",
    "Kanna | Dragon Maid",
    "Hideri Kanzaki | Blend S",
    "Nico Yazawa | Love live",
    "Yukimura Shinya | Rikei ga Koi",
    "Mitsuru Kirijo | Persona",
  ];

  let waifus = [
    "https://media1.tenor.com/images/3a51c19e70a935b69a0772805147baf7/tenor.gif?itemid=13458968",
    "https://steamuserimages-a.akamaihd.net/ugc/965355694154297423/770B44AD3B8F232866833559C8309C5D58DFD783/",
    "https://media1.tenor.com/images/97848c5b98cc9718edfe8c93644f2b11/tenor.gif?itemid=17406018",
    "https://art.ngfiles.com/images/1303000/1303202_harrison2142_she-s-got-a-thing-for-pancakes.gif?f1591494744",
    "https://giffiles.alphacoders.com/487/48710.gif",
    "https://media1.tenor.com/images/6372eb4432bb604cdcf4cd228206d0d7/tenor.gif?itemid=14770476",
    "https://thumbs.gfycat.com/PassionateGiddyIzuthrush-max-1mb.gif",
    "https://66.media.tumblr.com/cc1bb9c59408ea5a5be10ec3a7a4d729/e017879c4a9e3fd7-f0/s500x750/10c84945eaf26d334d9ada4d1160790489647b31.gif",
    "https://em.wattpad.com/a761d6bba8eec094836b7f3e8d580e35ccaa9314/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f694d6d7352345f4f697568546d413d3d2d3836383031303035302e313630363964333763323633353733363438303130363735393832312e676966?s=fit&w=720&h=720",
    "https://media1.tenor.com/images/ef3a0543904fcd8dd5cdda63ff824ad4/tenor.gif?itemid=3531982",
    "https://i.pinimg.com/originals/70/9a/4d/709a4d8ed9a4202c456b15e1728012f2.gif",
    "https://i.pinimg.com/originals/f6/d8/11/f6d811475b0e8c881170fe44e38dbb50.gif",
    "https://data.whicdn.com/images/311865340/original.gif",
    "https://thumbs.gfycat.com/DetailedNastyHarvestmouse-size_restricted.gif",
    "https://thumbs.gfycat.com/BriskRealisticJackal-max-1mb.gif",
    "https://i.imgur.com/K64OpjG.gif?noredirect",
    "https://steamuserimages-a.akamaihd.net/ugc/954103112222028893/090804B2AFDE06721377FE68387A0CB7765EB582/",
    "https://i.pinimg.com/originals/3c/33/81/3c33810364a823879bc5ad69205706d2.gif",
    "https://pa1.narvii.com/7084/05a965bcf36f7bd389a2b27d505b1d91dc948cdfr1-300-360_hq.gif",
    "https://pa1.narvii.com/7084/e99ffa8dbd34db6d8e0c48961ad34b053aa9974fr1-300-360_hq.gif",
    "https://thumbs.gfycat.com/DelightfulSoulfulArcticduck-size_restricted.gif",
    "https://pa1.narvii.com/7176/ddb38c58d6fecc9f2211f6c4e1add949e9c03351r1-500-259_hq.gif",
    "https://31.media.tumblr.com/d9d19ad3f9011d6ebd7eda39ddacc0e2/tumblr_mwp5h5AXJu1r3ifxzo1_500.gif",
    "https://thumbs.gfycat.com/BruisedNiftyKiwi-size_restricted.gif",
    "https://giffiles.alphacoders.com/207/207215.gif",
    "https://media0.giphy.com/media/7C7pNe8NIpbFe/giphy.gif",
    "https://i.pinimg.com/originals/08/7a/a9/087aa968ab4707080ee908167c1e6a3a.gif",
    "https://i.pinimg.com/originals/43/91/5b/43915b2d7d46311198a624953a4921e7.gif",
    "https://thumbs.gfycat.com/DetailedJointIvorybackedwoodswallow-max-1mb.gif",
    "https://31.media.tumblr.com/2dac7eb5368454773705fb94b14027c1/tumblr_mpby42uyyI1rfbdu4o1_500.gif",
    "https://i.pinimg.com/originals/5f/08/cc/5f08ccadfab581517f073245adb5f68c.gif",
    "https://media1.tenor.com/images/f5d821db20e68ca38b678db11001212b/tenor.gif?itemid=10374472",
    "https://media1.tenor.com/images/15c4305f7caf2e6011aec85ec51bfb65/tenor.gif?itemid=10242375",
    "https://66.media.tumblr.com/e02b3113fe2f1f33f00c120e2bfb93ab/051a5eac554eaf17-f5/s500x750/acfd998713425921b0643c461fa2a3d12a9e546d.gif",
    "https://i.pinimg.com/originals/7b/d8/9c/7bd89c360645dda40e1b962e843ca331.gif",
  ];

  console.log(`${waifus.length} Gifs de waifu!`);
  let n = Math.floor(Math.random() * waifus.length);
  let user;
  if (msg.mentions.users.first()) {
    user = msg.mentions.users.first();
  } else if (args[0]) {
    user = msg.guild.members.cache.get(args[0]).user;
  } else {
    user = msg.author;
  }
  let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
  let taxa = Math.floor(Math.random() * 101);

  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(user.tag, avatar)
    .setDescription(`Love rate: ${taxa}%`)
    .setTitle(`Your waifu is: ${names[n]}`)
    .setImage(waifus[n])
    .setTimestamp();
  msg.channel.send(embed);
};
module.exports = {
  name: "waifu",
  help: "Ele mostra a sua waifu!",
  execute,
};
