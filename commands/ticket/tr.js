const Discord = require("discord.js");
const fs = require("fs");
const embedColor = "#9c1c34";
const embedSuccess = "#9c1c34";
const Fail = "#9c1c34";
const db = require("quick.db");
const mongoose = require("mongoose")
const Tr = require("../../models/tr.js");

module.exports = {
name: 'Ticket-toggle',
permissions: [ 'MANAGE_CHANNELS', 'MANAGE_PREMISSION'],
run: async (client, message) => {  
  let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (!args) args = ""; // "React with ✅ to create a support ticket.";
  let ticket = db.fetch(`ttoggle_${message.guild.id}`);
  if (ticket === undefined) ticket = "on";
  let off = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setColor(Fail)
    .setDescription("Tickets are `Off`.");
  if (ticket === "off") return message.channel.send(off);

   Tr.findOne({
     guildID: message.guild.id,
      }, (err, tr) => {
        if(!tr) {
          const newTr = new Tr({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            msgid: message.id,
            reason: "Opened by reaction"
          })
          newTr.save().catch(err => console.log(err))
        } else {
           client.channels.cache
        .get(message.channel.id)
        .messages.fetch(tr.msgid)
        .then(message => message.delete())
        .catch(err => console.err);
  message.channel
    .send({
      embed: {
        color: embedColor,
        title: `React with ✉️ to create a ticket.`,
        description: `${args}`,
        timestamp: new Date(),
        footer: {
          text: `Protectionplus.me`,
          icon_url: `${client.user.avatarURL()}`
        }
      }
    }) //(`${args}`) //("React with ✅ to create a support ticket.")
    .then(message => {
      message.react("✉️");
    tr.msgid = message.id
          tr.reason = args
          tr.save().catch(err => console.log(err))
     
      
     // if (message.id === tr.msgid) return message.delete();
     
          
  })
        message.delete();
        }
        
    
  
    })
  
}}

module.exports.help = {
  name: "tr"
};