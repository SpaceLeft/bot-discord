
const Discord = require("discord.js");
const Color = "#36393e";
const Success = "#22BF41";
const Fail = "#f30707";
const db = require("quick.db");
const mongoose = require("mongoose")
const Tickets = require("../../models/tickets.js");

module.exports = {
    name: "closeall",
    aliases: ['ca'],
    description: "close all ticket in server",
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

   let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  let role = tickets.role
  let Support = message.guild.roles.cache.find(role => role.name === role);
  if (!Support) {
    try {
      Support = message.guild.roles.create({
        data: {
          name: "Support",
          color: "#000000"
        },
        reason: "Support role for interaction with tickets."
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let embed2 = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setColor("9e1c36")
    .setDescription("**You don't have `Manage Guild` permission.**");
  if (!message.member.permissions.has("MANAGE_GUILD"))

return message.channel.send(embed2)
 
  message.react("✅").then(() => message.react("❌"));
  const filter = (reaction, user) => {
    return reaction.emoji.name === "✅" && user.id === message.author.id;
  };

  const collector = message.createReactionCollector(filter, { time: 15000 });

  collector.on("collect", (reaction, user) => {
    message.reactions
      .removeAll()
      .catch(error => console.error("Failed to clear reactions: ", error));
    let cant1 = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setColor("9e1c36")
      .setDescription(
        "**There aren't any tickets opened to execute this command!**"
      )
      .setTimestamp();
    if (
      message.guild.channels.cache.filter(c =>
        c.name.toLowerCase().startsWith("ticket-")
      ).size < 1
    )

return message.channel.send(cant1)

    message.guild.channels.cache
      .filter(c => c.name.toLowerCase().startsWith("ticket-"))
      .forEach(channel => {
        channel.delete();
      });
    let succes = new Discord.MessageEmbed()
      .setColor("#9e1c36")
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription(`**All tickets have been deleted successfully!**`)
      .setTimestamp();

return message.channel.send(succes)

  });

  const filter1 = (reaction, user) => {
    return reaction.emoji.name === "❌" && user.id === message.author.id;
  };

  const collector1 = message.createReactionCollector(filter1, { time: 15000 });

  collector1.on("collect", (reaction, user) => {
    message.reactions
      .removeAll()
      .catch(error => console.error("Failed to clear reactions: ", error));
    message.delete();
  });
        }
   })
}};
module.exports.help = {
  name: "closeall"
};

