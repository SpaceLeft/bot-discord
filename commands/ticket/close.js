const language = "en";

const Discord = require("discord.js");
const Color = "#36393e";
const Success = "#22BF41";
const Fail = "#f30707";
const db = require("quick.db")
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");

module.exports = {
    name: "close",
    description: "close the ticket",
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
  let error = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`You can't use this command outside tickets!`)
    .setTimestamp();
  let role = tickets.role
  let cant = new Discord.MessageEmbed()
    .setColor("9e1c36")
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(`You must have \`${role}\` role or Administrator to use this command!`)
    .setTimestamp();


  if (!message.guild.member(message.author).roles.cache.find(r => r.name === role) && !message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send({ embed: cant });
  if (!message.channel.name.startsWith(`ticket-`))
    return message.channel.send({ embed: error });
  message.react('✅')
			.then(() => message.react('❌'))
  const filter = (reaction, user) => {
	return reaction.emoji.name === '✅' && user.id === message.author.id;
};

const collector = message.createReactionCollector(filter, { time: 15000 });

collector.on('collect', (reaction, user) => {
  message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
	message.channel.delete();
});
  
  const filter1 = (reaction, user) => {
	return reaction.emoji.name === '❌' && user.id === message.author.id;
    
};

const collector1 = message.createReactionCollector(filter1, { time: 15000 });

collector1.on('collect', (reaction, user) => {
  message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
  message.delete();
});
  
        }
   })
}}

module.exports.help = {
  name: "close"
};