
//mute&unmute
 const language = "en";
 const Discord = require("discord.js")


 const db = require("quick.db")

module.exports = {
    name: "unmute",
    aliases: ['تكلم'],
    description: "unmute member",
    permissions: 'MANAGE_ROLES',
  run: async (client, message, args, prefix) => {
     

  

 let mention = message.mentions.members.first();
let role = message.guild.roles.cache.find(ro => ro.name == 'Muted');
if(!role) {
    message.guild.roles.create({
        data: {
            name: 'Muted',
            permissions: [],
            color: '9e1c36'
        }
    })
}
if(!mention) {
   let embed1 = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
   .setDescription(`Usage: ${prefix}unmute <@user>`)
      .setColor('9e1c36');
return message.channel.send(embed1)
}
message.guild.channels.cache.forEach(c => {
c.updateOverwrite(role , {
SEND_MESSAGES: false, 
ADD_REACTIONS: false
});
});
mention.roles.remove(role)
  let embed2 = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setDescription(`Successfully Unmuted ${mention.user}`)
      .setColor('9e1c36');

return message.channel.send(embed2)
}
  }
