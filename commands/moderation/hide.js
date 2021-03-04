
//// كود اخفاء و اضهار الروم
const Discord = require("discord.js");
const language = "en" 
const db = require("quick.db")
module.exports = {
    name: "hide",
    aliases: ['اخفي'],
    description: "hide server channels",
    permissions: 'MANAGE_CHANNELS',
    run: async (client, message, args) => {  

  

  
  
    if (!message.channel.guild) {
      let dm = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

          .setDescription("this command is only for servers.")
          .setColor("9e1c36")
          return message.reply(dm)
      
      
    }

    
    message.channel
message.channel.createOverwrite(message.guild.id, {
  VIEW_CHANNEL: false
})
      .then(() => {
      let embedd = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

      .setDescription("Done its hidden.")
      .setColor("9e1c36")  
        return message.channel.send(embedd);
        });
  }}