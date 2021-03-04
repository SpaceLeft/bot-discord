const db = require("quick.db")  
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");
const Discord = require("discord.js")
module.exports = {
        name: 'set-description',
        description: 'Ticket',
        permissions: 'ADMINISTRATOR',
        usage: '<description>',
run: async (client, message, args, prefix) => {

       Tickets.findOne({
     guildID: message.guild.id,
      }, (err, tickets) => {
        if(!tickets) {
          const newTickets = new Tickets({
            _id: mongoose.Types.ObjectId(),
  guildID: message.guild.id,
  number: 0,
  role: "Support",
  toggle: "on"
          })
          newTickets.save().catch(err => console.log(err))
        } else {
  
   let ticket = tickets.toggle
   let off = new Discord.MessageEmbed()
   .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setColor("9e1c36")
    .setDescription("Tickets are `Off`.");
  if(ticket === "off") return message.channel.send(off)
  

let description = args.slice(0).join(" ")
  
if(!description) return message.channel.send(new Discord.MessageEmbed().setColor("9e1c36").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`**Usage: ${prefix}set-description <description> **`))
      
return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**Success has been update your ticket description to : \n\n ${description}**`))

.then( () => {db.set(`description_${message.guild.id}`, description)})
  

  
}})}}