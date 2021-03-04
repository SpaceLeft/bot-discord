const Discord = require("discord.js")
const db = require("quick.db")
module.exports = {
name: "whitelist-delete",
run: async (client, message, args) => {
if(message.author.id === message.guild.ownerID) {
let user = message.mentions.users.first()
if(!user) {return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Make sure mention next time`).setColor("#9e1c36"))}
const guildicon = message.guild.iconURL();
let database = await db.get(`trustedusers_${message.guild.id}`)
if(database) {
let data = database.find(x => x.user === user.id)
let unabletofind = new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setColor("9e1c36")

.setTitle("Error")
.setDescription(`I cant find that user on database. `)
 if(!data) return message.channel.send(unabletofind)
let value = database.indexOf(data)
delete database[value]
var filter = database.filter(x => {return x != null && x != ''})
await db.set(`trustedusers_${message.guild.id}`, filter)
let deleted = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`${user} has been removed from whitelist users `)
.setColor("9e1c36")
return message.channel.send(deleted)
} else {          
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`that user not on whitelist users list`) .setColor("9e1c36"))
}}
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Only \`ownership\` of the guild can use that cmd!`) .setColor("9e1c36"))}}
 
