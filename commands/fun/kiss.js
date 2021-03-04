const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (client, message) => {


  
  let user = message.mentions.users.first()
    if (!user) return message.channel.send(new Discord.MessageEmbed() .setDescription("please mention someone!").setColor('9e1c36'))
    const embed = new Discord.MessageEmbed()
      .setDescription(`**[Protection+](https://protectionplus.me/)**
  
                        ${message.author} Kissed 💕 ${user}`)
      .setImage("https://media.tenor.com/images/812eb214ba127e32f7d5b52e1f001963/tenor.gif")
      .setColor('9e1c36')
      .setFooter(`Requsted By: ${message.author.tag}`)
      
      message.channel.send(embed)
  
      }
  
  
  