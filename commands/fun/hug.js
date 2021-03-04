const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  const db = require("discord.js")


  

  
  let user = message.mentions.users.first()
    if (!user) return message.channel.send(new Discord.MessageEmbed() .setDescription("please mention someone!").setColor('9e1c36'))
    const embed = new Discord.MessageEmbed()
      .setDescription(`**[Protection+](https://protectionplus.me/)**
  
                        ${message.author} Hugs 💕 ${user}`)
      .setImage("https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif")
      .setColor('9e1c36')
      .setFooter(`Requsted By: ${message.author.tag}`)
     message.react("💕").catch(error => {
          message.react("❌")})
      
      message.channel.send(embed)
  
      }
  
  
  
  