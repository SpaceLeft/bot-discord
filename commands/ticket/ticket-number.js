const Discord = require("discord.js")
const config = require("../../config.json")
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");
const db = require('quick.db')
module.exports = {
name: 'Ticket-number',
permissions: 'ADMINISTRATOR',
run: async (client, message, args) => {
  

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

let number = args[0]
if(isNaN(number)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9c1c34").setDescription(`Numbers only`))
return message.channel.send(new Discord.MessageEmbed().setColor("#9c1c34").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Done has been set the tickets number to ${number}`))
.then( () => {
tickets.number = number
tickets.save()
})

    
     }
   })
}}