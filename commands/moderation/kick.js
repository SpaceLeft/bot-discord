const Discord = require("discord.js");
const db = require("quick.db")
const language = "en";
let prefix = "+"
//ban
module.exports = {
    name: "kcik",
    aliases: ['طير'],
    description: "kick member from the server",
    permissions: 'KICK_MEMBERS',
    run: async (client, message) => {  
      
    if(message.author.bot) return;

        let user = message.mentions.members.first();
        let args = message.content.split(' ');
        if(!user || !args[1]) {
                    let embed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription(`Usage : ${prefix}kick @user`)
          .setColor("9e1c36")
          
     

return message.channel.send(embed)
}
        if(message.mentions.users.size < 1) {
                    let embed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription(`I can't kick this member.`)
          .setColor("9e1c36")

          

return message.channel.send(embed)

        }

         

return message.channel.send(new Discord.MessageEmbed()
         .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription(`Done ${user} has been kicked.`)
          .setColor("9e1c36"))
  
      .then(user.kick())
    }}