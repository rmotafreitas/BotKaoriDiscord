const { Client, Message, MessageEmbed } = require('discord.js');
const Data = require("../../models/economy");

module.exports = {
    name: 'leaderboard',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        Data.find({
            lb: "all",
          })
            .sort([["money", "descending"]])
            .exec((err, res) => {
              if (err) console.log(err);
        
              var users = 0;
              for (i = 0; i < res.length; i++) {
        
                if(res.money != -1) {
                  users++;
                }
              }
        
              var page = Math.ceil(users / 10);
        
              let embed = new MessageEmbed();
              embed.setTitle("LEADERBOARD");
              embed.setThumbnail(
                "https://i.pinimg.com/originals/37/f6/e3/37f6e3c43e554757633ae8aff2b4c917.png"
              );
              //name
              let pg = parseInt(args[0]);
              if (pg != Math.floor(pg)) pg = 1;
              if (!pg) pg = 1;
              let end = pg * 10;
              let start = pg * 10 - 10;
        
              if (res.length === 0) {
                embed.addField("Error", "No pages found!");
              } else if (res.length <= start) {
                embed.addField("Error", "Page not found!");
              } else if (res.length <= end) {
                embed.setFooter(`page ${pg} of ${page}`);
        
                for (i = start; i < res.length; i++) {
                  
                  if (res[i].money == -1) {
                  } else {
                    embed.addField(
                      `${i + 1}. ${!client.users.cache.get(res[i].id) ? res[i].name : client.users.cache.get(res[i].id).username}`,
                      `$${res[i].money.toLocaleString()}`
                    );
                  }
                }
              } else {
                embed.setFooter(`page ${pg} of ${page}`);
                for (i = start; i < end; i++) {
                  if (res[i].money == -1) {
                  } else {
                    embed.addField(
                      `${i + 1}. ${!client.users.cache.get(res[i].id) ? res[i].name : client.users.cache.get(res[i].id).username}`,
                      `$${res[i].money.toLocaleString()}`
                    );
                  }
                }
              }
        
              message.channel.send(embed);
            });
    }
}