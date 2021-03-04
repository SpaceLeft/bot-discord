const Discord = require("discord.js");
const db = require("quick.db")
const language = "en";
let prefix = "+"
//ban
module.exports = {
    name: "ban",
    description: "ban members from server",
    permissions: 'BAN_MEMBERS',
    run: async (client, message) => {

      
      
        
        let user = message.mentions.members.first();
        let args = message.content.split(' ');
        if(!user || !args[1]) {
                    let embed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription(`Usage : ${prefix}ban @user`)
          .setColor("9e1c36")
          
return message.channel.send(embed)
}
        if(message.mentions.users.size < 1) {
                    let embed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription(`I can't ban this member.`)
          .setColor("9e1c36")
          

          
return message.channel.send(embed)

        }
        
         
         

return message.channel.send(new Discord.MessageEmbed()
         .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription(`Done ${user} has been baned.`)
          .setColor("9e1c36"))
  
      .then(user.ban())
    }}


