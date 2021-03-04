const Discord = require("discord.js")
const config = require("../../config.json")
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");
const db = require('quick.db')
module.exports = {
name: 'Ticket-config',
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
let cato = db.get(`category_${message.guild.id}`);

  let embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setTitle(`Ticket Config`)
  .setDescription(`
  Ticket number : ${tickets.number}
  Ticket toggle : ${tickets.toggle}
  Ticket role : ${tickets.role}
  Ticket category : ${cato}
  `)
  .setColor("#9c1c34")
  message.channel.send(embed)
}
   })
}}