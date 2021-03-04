const Discord = require("discord.js");
const language = "en" 
const db = require("quick.db")
module.exports = {
    name: "unhide",
    description: "to unhide channel",
    permissions: 'MANAGE_CHANNELS',
    run: async (client, message, args, db) => {


    if (!message.channel.guild){
      let dm2 = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription("this command is only for servers.")
          .setColor("9e1c36")
          return message.reply(dm2)
    }


    message.channel
      .createOverwrite(message.guild.id, {
        VIEW_CHANNEL: true
      })
      .then(() => {
 let embedd2 = new Discord.MessageEmbed()
 .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription("Done its unhidden.")
      .setColor("9e1c36")  

        return message.channel.send(embedd2);
        });
  }}

