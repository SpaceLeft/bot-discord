const db = require("quick.db")  
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");
const Discord = require("discord.js")
module.exports = {
name: 'set-category',
description: 'Ticket',
permissions: 'ADMINISTRATOR',
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
   .setAuthor(`${message.author.tag}`, `${message.author.avatarURL({dynamic:true})}`)
    .setColor("9e1c36")
    .setDescription("Tickets are `Off`.");
  if(ticket === "off") return message.channel.send(off)

  
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**Usage: ${prefix}set-category <category> **`))
  
let cat = message.guild.channels.cache.filter(x => x.type == "category").find(c => c.name == args[0] || c.id == args[0]);
  
if (!cat) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("**I can't find this category!**"));
  
db.set(`category_${message.guild.id}`, cat.id);

return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**Success Category Tickets Has been changed to ${cat}**`));
  
console.log(cat.id)
  
}}) }}