const Discord = require("discord.js")
const client = new Discord.Client();
const config = require("../../config.json")
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = {
    name: "profile",
    run: async (client, message) => { 
      if (message.author.bot || !message.guild) return; 

let money = db.all().filter(data => data.ID.startsWith(`level_`)).sort((a, b) => b.data - a.data);

    money.length = 30;// عدد التوب
    var finalLb = "";
    for (var i in money) {
      if (money[i].data === null) money[i].data = 0
      finalLb += `**#${money.indexOf(money[i]) + 1} - ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** | ${money[i].data}\n`;
    };

    const embed = new Discord.MessageEmbed()
      .setTitle(`level Leaderboard`)
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setColor("9e1c36")
      .setDescription(`
${finalLb}`)

    message.channel.send(embed)
  }
}