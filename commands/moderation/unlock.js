const Discord = require("discord.js");
const language = "en";
const db = require("quick.db")
module.exports = {
    name: "unlock",
    description: "to unhide channel",
    permissions: 'MANAGE_CHANNELS',
    run: async (client, message, args, db) => { 
 

    if (!message.channel.guild){
            let dm = new Discord.MessageEmbed()
           .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription("this command is only for servers.")
          .setColor("9e1c36")

return message.channel.send(dm)

}


  

    message.channel
      .createOverwrite(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
       let embedd = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription("Done its unlocked.")
      .setColor("9e1c36")  

return message.channel.send(embedd)
  });
  }}

