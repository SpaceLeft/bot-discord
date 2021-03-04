const language = "en";
const Discord = require("discord.js");
const Color = "#36393e";
const Success = "#22BF41";
const Fail = "#f30707";
const db = require("quick.db")
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");

module.exports = {
    name: "rename",
    description: "to reanme the ticket",
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
  
  let args = message.content
    .split(" ")
    .slice(1)
    .join("-");
  let error = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`You can't use this command outside tickets!`)
 
  let error2 = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`لا يمكنك استخدام هذا الامر خارج التذكرة!`)
 
  
  let Name = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`Write anything to change ticket name.`)
  
   let Name2 = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`من فضلك قم بكتابة الاسم الجديد`)
  
  let done = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`Ticket name has been changed To: \`ticket-${args}\``)

  let done2 = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`تم تغيير اسم التذكرة الاسم الجديد : \`ticket-${args}\``)

  
  

  let role = tickets.role
   let cant = new Discord.MessageEmbed()
    .setColor("9e1c36")
       .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`You must have \`${role}\` role in order to execute this command!`)
    .setTimestamp();
          
             let cant2 = new Discord.MessageEmbed()
    .setColor("9e1c36")
       .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

    .setDescription(`يجب ان يكون لديك رتبة \`${role}\` لأستخدام هذا الامر`)
    .setTimestamp();
          
  if (
    !message.guild
      .member(message.author)
      .roles.cache.find(r => r.name === role)
  )

return message.channel.send(cant)

if (!message.channel.name.startsWith(`ticket-`))

return message.channel.send(error)

return message.channel.send(Name)

  message.channel.setName(`ticket-${args}`).then(() => {
return message.channel.send(done)
});
        }
   })
}}