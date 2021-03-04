
///كود منشن بوتات
const Discord = require("discord.js");
const db = require("quick.db")
const language = "en"
module.exports = {
    name: "ls",
    description: "show server bots",
    run: async (client, message, args) => {



      var list_all = [];
    message.guild.members.cache.forEach(bb => {
      if (!bb.user.bot) return;
      list_all.push(`<@${bb.user.id}>`);
    });
    
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(list_all.join(" , "))
    .setColor("9e1c36")

    
    message.channel.send(embed);
  }}