  const db = require("quick.db")
let prefix = "+"
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "avatar",
    aliases: ['avt'],
    cooldown: 5,
    run: async (client, message) => {
const args = message.content.slice(prefix.length).trim().split(/ +/)
let cmd = args[0]

  if(message.author.bot || !message.guild || !message.content.startsWith(prefix))return;
let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(x=> x.id == args[0]) || message.author);
      if(!cmd) {
message.channel.send(new MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.addField(`**WEBP**`, `[Direct](${user.user.avatarURL({dynamic: false, format: 'webp' })}) | [128x](${user.user.avatarURL({dynamic: false, size: 128, format: 'webp' })}) | [256x](${user.user.avatarURL({dynamic: false, size: 256, format: 'webp' })}) | [512x](${user.user.avatarURL({dynamic: false, size: 512, format: 'webp' })}) | [1024x](${user.user.avatarURL({dynamic: false, size: 1024, format: 'webp' })}) | [2048x](${user.user.avatarURL({dynamic: false, size: 2048, format: 'webp' })}) | [4096x](${user.user.avatarURL({dynamic: false, size: 4096, format: 'webp' })})`)
.addField(`**PNG**`, `[Direct](${user.user.avatarURL({dynamic: false, format: 'png' })}) | [128x](${user.user.avatarURL({dynamic: false, size: 128, format: 'png' })}) | [256x](${user.user.avatarURL({dynamic: false, size: 256, format: 'png' })}) | [512x](${user.user.avatarURL({dynamic: false, size: 512, format: 'png' })}) | [1024x](${user.user.avatarURL({dynamic: false, size: 1024, format: 'png' })}) | [2048x](${user.user.avatarURL({dynamic: false, size: 2048, format: 'png' })}) | [4096x](${user.user.avatarURL({dynamic: false, size: 4096, format: 'png' })})`)
.addField(`**JPG**`, `[Direct](${user.user.avatarURL({dynamic: false, format: 'jpg' })}) | [128x](${user.user.avatarURL({dynamic: false, size: 128, format: 'jpg' })}) | [256x](${user.user.avatarURL({dynamic: false, size: 256, format: 'jpg' })}) | [512x](${user.user.avatarURL({dynamic: false, size: 512, format: 'jpg' })}) | [1024x](${user.user.avatarURL({dynamic: false, size: 1024, format: 'jpg' })}) | [2048x](${user.user.avatarURL({dynamic: false, size: 2048, format: 'jpg' })}) | [4096x](${user.user.avatarURL({dynamic: false, size: 4096, format: 'jpg' })})`)
.setImage(user.user.avatarURL({dynamic: true, size: 2048 }))
.setColor("9e1c36")
);
      }
if(cmd.toLowerCase() === "server"){
    
    
    message.channel.send(new MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.addField(`**WEBP**`, `[Direct](${message.guild.iconURL({dynamic: false, format: 'webp' })}) | [128x](${message.guild.iconURL({dynamic: false, size: 128, format: 'webp' })}) | [256x](${message.guild.iconURL({dynamic: false, size: 256, format: 'webp' })}) | [512x](${message.guild.iconURL({dynamic: false, size: 512, format: 'webp' })}) | [1024x](${message.guild.iconURL({dynamic: false, size: 1024, format: 'webp' })}) | [2048x](${message.guild.iconURL({dynamic: false, size: 2048, format: 'webp' })}) | [4096x](${message.guild.iconURL({dynamic: false, size: 4096, format: 'webp' })})`)
.addField(`**PNG**`, `[Direct](${message.guild.iconURL({dynamic: false, format: 'png' })}) | [128x](${message.guild.iconURL({dynamic: false, size: 128, format: 'png' })}) | [256x](${message.guild.iconURL({dynamic: false, size: 256, format: 'png' })}) | [512x](${message.guild.iconURL({dynamic: false, size: 512, format: 'png' })}) | [1024x](${message.guild.iconURL({dynamic: false, size: 1024, format: 'png' })}) | [2048x](${message.guild.iconURL({dynamic: false, size: 2048, format: 'png' })}) | [4096x](${message.guild.iconURL({dynamic: false, size: 4096, format: 'png' })})`)
.addField(`**JPG**`, `[Direct](${message.guild.iconURL({dynamic: false, format: 'jpg' })}) | [128x](${message.guild.iconURL({dynamic: false, size: 128, format: 'jpg' })}) | [256x](${message.guild.iconURL({dynamic: false, size: 256, format: 'jpg' })}) | [512x](${message.guild.iconURL({dynamic: false, size: 512, format: 'jpg' })}) | [1024x](${message.guild.iconURL({dynamic: false, size: 1024, format: 'jpg' })}) | [2048x](${message.guild.iconURL({dynamic: false, size: 2048, format: 'jpg' })}) | [4096x](${message.guild.iconURL({dynamic: false, size: 4096, format: 'jpg' })})`)
.setImage(message.guild.iconURL({dynamic: true, size: 2048 }))
.setColor("9e1c36")
);
  
    
  } 
  }
  
}

