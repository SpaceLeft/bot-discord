const language = "en";

const Discord = require("discord.js");
const Color = "#36393e";
const Success = "#22BF41";
const Fail = "#f30707";
const db = require("quick.db")
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");

module.exports = {
    name: "remove",
    description: "remove someone from ticket",
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
    .setColor("9e1c36")
       .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription("Tickets are `Off`.");
  if(ticket === "off") return message.channel.send(off)
  
  let args = message.content.split(" ");
  let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[1])
  );
  let k = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`${user} , Has Been Removed From This Ticket.`)
    .setFooter(
      
    )
  
  let k2 = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`تم ازالة ${user} من التذكرة`)
    .setFooter(
      
    )
  
    //.setTimestamp();

  let error = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`You can't use this command outside tickets!`)
    .setFooter(`${message.author.username}`, `${message.author.avatarURL()}`)
   // .setTimestamp();
  
  let error2 = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`لا يمكنك استخدام هذا الامر خارج التذكرة`)
    .setFooter(`${message.author.username}`, `${message.author.avatarURL()}`)

  


  let embed3 = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`Make sure to mention or type user's id next time!`)
    .setFooter(`${message.author.username}`, `${message.author.avatarURL()}`)
   // .setTimestamp();

  let embed32 = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`من فضلك تأكد من اسم الشخص!`)
    .setFooter(`${message.author.username}`, `${message.author.avatarURL()}`)
  

  let role = tickets.role
   let cant = new Discord.MessageEmbed()
    .setColor("9e1c36")
       .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`You must have \`${role}\` role in order to execute this command!`)
    .setFooter(`${message.author.username}`, `${message.author.avatarURL()}`)
    .setTimestamp();
          
          let cant2 = new Discord.MessageEmbed()
    .setColor("9e1c36")
       .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`يجب ان يكون لديك رتبة \`${role}\` لأستخدام الامر`)
    .setFooter(`${message.author.username}`, `${message.author.avatarURL()}`)
    .setTimestamp();
          
  if (
    !message.guild
      .member(message.author)
      .roles.cache.find(r => r.name === role)
  )

return message.channel.send(cant)


          if (message.member.hasPermission("ADMINISTRATOR")) {
let embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription("This member have ADMINISTRATOR Permission i can't remove him")
.setColor("9e1c36")

let embed2 = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription("هذا الشخص لديه صلاحيات ادارية لا يمكنني طرده من التذكرة")
.setColor("9e1c36")

return message.channel.send(embed)
} 

          
  if (!message.channel.name.startsWith(`ticket-`))
return message.channel.send(error)


  if (!user)
return message.channel.send(embed3)


  message.channel.permissionOverwrites
    .get(user.user.id)
    .delete()
    .then(() => {

return message.channel.send(k)


    });
        }
   })
}}

