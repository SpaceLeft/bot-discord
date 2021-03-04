const Discord = require("discord.js")
const config = require("../../config.json")
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");
module.exports = {
name: 'ticket-role',
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
  
let role = message.mentions.roles.first()
if(!role) message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("i can't find this role").setColor("9e1c36"))
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`Done has been set ${role} as a ticket role.`))
tickets.role = role.name
tickets.save()
          console.log(`Done`)
}
   })
}}