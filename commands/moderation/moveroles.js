const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require('quick.db');


module.exports = {
  name: "moveroles",
  description: "transfer roles from one to one",
    permissions: 'ADMINISTRATOR',
  run: async (client, message, args) => {

  let user = message.mentions.members.array()
  let user1 = user[0]
  let user2 = user[1]
  let roles = user1.roles?user1.roles.cache.filter(c => c.name != "@everyone"):null
  if(!user) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("Please mention the first one"))
  if(!user1) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("Please mention the first one"))
  if(!user2) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("Please mention the secund one"))

if(roles){

roles.forEach(r => {
  user2.roles.add(r)
})
  roles.forEach(r => {
  user1.roles.remove(r)
})
  
}
  message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Done has been transfer ${user1} roles to ${user2}`))
  }}
/**/