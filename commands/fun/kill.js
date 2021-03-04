const Discord = require("discord.js");
const db = require("quick.db")
module.exports = {
    name: "kill",
    run: async (client, message, args) => {
      

 
  

    let user = message.mentions.users.first()
    if (!user) return message.channel.send(new Discord.MessageEmbed() .setDescription("please mention someone!").setColor('9e1c36'))
    const embed = new Discord.MessageEmbed()
      .setDescription(`**[Protection+](https://protectionplus.me/)**
  
                        ${message.author} Killed ${user}`)
      .setImage("https://media.tenor.com/images/f8b6ca564c35dff2565ce5fcbfeee21f/tenor.gif")
      .setColor('9e1c36')
      .setFooter(`Requsted By: ${message.author.tag}`)
      
      message.channel.send(embed)
  
      }}
  
  
