const Discord = require("discord.js");
//const db = require("quick.db");
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");
const db = require("quick.db")
module.exports = {
    name: "new",
    description: "create a ticket",
    run: async (client, message) => {  
      let catID = await db.get(`category_${message.guild.id}`)
 var description = db.get(`description_${message.guild.id}`)
 if(description === null) description = "Thank you for reaching out to our support team!\n\nWe will get back to you as soon as possible\n\n"
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
  
  let off = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setColor("#9e1c36")
    .setDescription("Tickets are `Off`.");
  if (tickets.toggle === "off") return message.channel.send(off);

  let number = tickets.number

  let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  let subject = args;
  if (!subject) subject = "No Subject";
  let role = tickets.role
 
  let Support = message.guild.roles.cache.find(role => role.name === role);


  let already = message.guild.channels.cache.find(
    c =>
      c.topic ===
      `Author: ${message.author.username} 
ID: ${message.author.id}`
  );

  let everyone = message.guild.roles.cache.find(
    role => role.name === "@everyone"
  );

  let open = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setColor("#9e1c36")
    .setDescription(`You already have a ticket opened __${already}__.`);

  if (already)
    return message.author.send(open).catch(err => console.log(err.console));
          var cato = message.guild.channels.cache.find(x => x.id == catID)

          if(cato) {
            
  message.guild.channels
    .create(`ticket-${number + 1}`, { type: "text", parent: `${catID}` })
    .then(ticket => {
      ticket.createOverwrite(message.guild.roles.cache.find(role => role.name === tickets.role), {
        SEND_MESSAGES: true,
        CIEW_CHANNEL: true
      });
      ticket.createOverwrite(everyone, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      });
      ticket.createOverwrite(message.author, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
      });

      let succes = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setColor("#9e1c36")
        .setDescription(`Your ticket has been created <#${ticket.id}>`)
        .setFooter(
          `${message.author.username}`,
          `${message.author.avatarURL()}`
        );
      // .setTimestamp();
      ticket.setTopic(
        `Author: ${message.author.username} 
ID: ${message.author.id}`
      );
      message.channel.send({ embed: succes });
      const nonedear = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setDescription(
          `Dear ${message.author}, \n\n${description}\n\n`
        )
        .addField("Subject", subject)
        .setColor("#9e1c36")
        .setFooter(`${client.user.username}`, `${client.user.avatarURL()}`)
        .setTimestamp();
      ticket.send({ embed: nonedear });
    });
          
          } else {
            
              message.guild.channels
    .create(`ticket-${number + 1}`, { type: "text" })
    .then(ticket => {
      ticket.createOverwrite(message.guild.roles.cache.find(role => role.name === tickets.role), {
        SEND_MESSAGES: true,
        CIEW_CHANNEL: true
      });
      ticket.createOverwrite(everyone, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      });
      ticket.createOverwrite(message.author, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
      });

      let succes = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setColor("#9e1c36")
        .setDescription(`Your ticket has been created <#${ticket.id}>`)
 
      // .setTimestamp();
      ticket.setTopic(
        `Author: ${message.author.username} 
ID: ${message.author.id}`
      );
      message.channel.send({ embed: succes });
      const nonedear = new Discord.MessageEmbed()    
       .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setDescription(
          `Dear ${message.author}, \n\n${description}\n\n`
        )       .addField("Subject", subject)
       .setColor("#9e1c36")
      ticket.send({ embed: nonedear });
    });
            
          }
          
          
  tickets.number = tickets.number + parseInt(1)
     tickets.save().catch(err => console.log(err))
        }
   })
}}

module.exports.help = {
  name: "new"
};