const language = "en";
const db = require('quick.db')
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "vkick",
    description: "to kick member from voice channel",
    permissions: 'MANAGE_CHANNELS',
  run: async (client, message, args) => {
       
        
          let user = message.mentions.members.first();
      if (!message.mentions.members.first())

return message.channel.send({
        embed: {
          color: "9e1c36",
          description: `Please mention user that you want to kick from Voice Channel!`
        }
      })


        

      let channel = message.mentions.members.first().voice;
  
      if (!channel)
        

return message.channel.send({
        embed: {
          color: "9e1c36",
          description: `${user} is not in any Voice Channel!`
        }
      })

        
  
      message.mentions.members.first().voice.kick();
        

return message.channel.send({
        embed: {
          color: "9e1c36",
          description: `${user} Has been kicked from Voice Channel!`
        }
      })
  
  
  }}
