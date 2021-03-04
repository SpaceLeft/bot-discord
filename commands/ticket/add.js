const Discord = require("discord.js");
const Color = "#36393e";
const Success = "#22BF41";
const Fail = "#f30707";
const db = require("quick.db")
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");
const language = "en";
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "add",
    description: "add someone to the ticket",
    cooldown: 5,
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
    .setDescription("**Tickets are `Off`.**");
  if(ticket === "off") return message.channel.send(off)
  let args = message.content.split(" ");
  let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[1])
  );
  let k = new Discord.MessageEmbed()
    .setColor("9e1c36")
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`**${user} , Has Been Added To This Ticket.**`)
   
    

  let error = new Discord.MessageEmbed()
    .setColor("9e1c36")
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`**You can't use this command outside tickets!**`)
    

  let embed3 = new Discord.MessageEmbed()
    .setColor("9e1c36")
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`**Make sure to mention or type user's id next time!**`)
    


    
  let role = tickets.role
  let cant = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`**You must have \`${role}\` role in order to execute this command!**`)
    
  if (!message.guild.member(message.author).roles.cache.find(r => r.name === role) && !message.member.hasPermission("ADMINISTRATOR"))
    

return message.channel.send({ embed: cant })

if (!message.channel.name.startsWith(`ticket-`))

return message.channel.send({ embed: error })

return message.channel.send({ embed: embed3 })

  message.channel
    .createOverwrite(user.user.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true
    })
    .then(() => {
      message.channel.send({ embed: k });
    })
        }
   })
}}

