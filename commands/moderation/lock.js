const Discord = require("discord.js");
const db = require("quick.db")


//// كود فتح واغلاق الروم
module.exports = {
    name: "lock",
    aliases: ['قفل'],
    description: "lock server channels",
    permissions: 'MANAGE_CHANNELS',
    run: async (client, message, args) => {  


    if (!message.channel.guild) {

     
    }
    message.channel
      .createOverwrite(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
      let embedd = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription("Done its locked.")
      .setColor("9e1c36")  
      
      let embedd2 = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription("تم قفل الروم بنجاح!")
      .setColor("9e1c36")  
      

return message.channel.send(embedd)
     });
    }}
