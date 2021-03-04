const Discord = require("discord.js")
const config = require("../../config.json")
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");
const db = require('quick.db')
module.exports = {
name: 'Ticket-toggle',
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
let onoff = args[0]
if(!onoff) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9c1c34").setDescription(`Chose on or off`))
if(onoff !== "on" && onoff !== "off") return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("#9c1c34").setDescription(`Chose on or off`))
return message.channel.send(new Discord.MessageEmbed().setColor("#9c1c34").setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Done the Ticket is now ${onoff}`))
.then( () => {
tickets.toggle = onoff
tickets.save()
})

    
     }
   })
}}