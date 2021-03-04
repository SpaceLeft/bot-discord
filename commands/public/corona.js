

//البكجات
//request

const language = "en";

const Discord = require("discord.js");

const db = require("quick.db")

module.exports = {
    name: "corona",
    description: "show corona info",
    cooldown: 5,
    run: async (client, message) => {



  const request = require("request");

  let args = message.content.split(/[ ]+/);
  let word = args.slice(1).join(" ");
    try {
      if (!word)
       {  let embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
       .setDescription("Usage: +corona <country>\nEx: +corona iraq")
       .setColor("#9e1c36");
        return message.reply(embed);
       }

      request(
        {
          json: true,
          url: "https://corona.lmao.ninja/v2/countries/" + word
        },
        (err, res, json) => {
          if (err) {
            message.reply("There was an error!");
          } else {
            let embed = new Discord.MessageEmbed()
              .setTitle(`Corona In ${json.country}`)
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL({dynamic:true})}`)
              .setDescription(
                `**Total Cases: **${json.cases}\n**Total Deaths: **${json.deaths}\n**Total Recoverd: **${json.recovered}\n **Active cases** ${json.active}\n\n**New cases**: ${json.todayCases}\n **New Deaths**: ${json.todayDeaths}\n **New Recovered**: ${json.todayRecovered}`
              )
              .setThumbnail(json.countryInfo.flag)
              .setColor("#9e1c36");
            message.channel.send(embed);
          }
        }
      );
    } catch (err) {
      message.channel.send("There was an error!\n" + err).catch();
    }
  }

}