const Discord = require("discord.js");
const language = "en"
const db = require("quick.db")
module.exports.run = async (client, message) => {
  

  let user = message.mentions.users.first()
  if (!user) return message.channel.send(new Discord.MessageEmbed() .setDescription("please mention someone!").setColor('9e1c36'))
    const embed = new Discord.MessageEmbed()
      .setDescription(`**[Protection+](https://protectionplus.me/)**
  
                        ${message.author} Slapped ${user}`)
      .setImage("https://cdn.discordapp.com/attachments/645576197987631116/725921833412460644/ezgif-5-755c458c568a.gif")
      .setColor('9e1c36')
      .setFooter(`Requsted By: ${message.author.tag}`)
      
      message.channel.send(embed)
  
      }
  
  
  
  