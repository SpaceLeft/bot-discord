const Discord = require("discord.js")
const db = require("quick.db")
module.exports = {
name: "whitelist-add",
run: async (client, message, args) => {
const guildicon = message.guild.iconURL();
if(message.author.id === message.guild.ownerID) {
 let user = message.mentions.users.first()
if(!user) {return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Make sure mention next time`).setColor("#9e1c36"))
}let trustedusers = await db.get(`trustedusers_${message.guild.id}`)
if(trustedusers && trustedusers.find(find => find.user == user.id)) {
return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(`This User It's Already on whitelist`).setColor("9e1c36"))
}
let data = {
user: user.id
}
await  db.push(`trustedusers_${message.guild.id}`, data)
let added = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setColor("9e1c36")
.setDescription(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(` ${user} has been added in whiteList succesfully. `).setColor("9e1c36"))
return message.channel.send(added);
}
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(`Only \`ownership\` of the server can use that command.`).setColor("9e1c36"))
}}
 