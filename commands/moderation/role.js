
//give role
const language = "en";
const Discord = require("discord.js");
const db = require("quick.db")
let prefix = "+"
module.exports = {
    name: "role",
    description: "give role to member",
    permissions: 'MANAGE_ROLES',
    run: async (client, message, args) => {

if(message.content.startsWith(prefix + 'role')) {

var user = message.mentions.members.first();
if(!user) {
  let embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setDescription(`Usage : ${prefix}role @user <role name>`)
  .setColor("9e1c36")

return message.channel.send(embed)

  
}
var role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.startsWith (message.content.split(" ").slice(2).join(" ")))
if(!role) {
  let embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setDescription("i can't find this role")
  .setColor("9e1c36")
  
  

return message.channel.send(embed)

}
if(user.roles.cache.get(role.id)){
user.roles.remove(role).then(() =>{
  let embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setDescription(`**Successfully Role Removed From ${user.user.username}, Role name \`${role.name}\`**`)
  .setColor("9e1c36")
  

return message.channel.send(embed)

    
  
})
} else {
user.roles.add(role).then(() =>{
  let embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setDescription(`**Successfully Added Role To ${user.user.username}, Role name : \`${role.name}\`**`)
  .setColor("9e1c36")
  

return message.channel.send(embed)
 })
}
}
}
}