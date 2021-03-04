const db = require("quick.db");
const Discord = require("discord.js");
const Color = "#9c1c34";
const Fail = "RED";
const mongoose = require("mongoose");
const Tr = require("../models/tr.js");
const config = require('../config.json')
const Tickets = require("../models/tickets.js");
const { Database } = require("quickmongo");
const db1 = new Database(config.database);
module.exports = async (client, reaction, user) => {
 var description = db.get(`description_${reaction.message.guild.id}`)
 if(description === null) description = "Thank you for reaching out to our support team!\n\nWe will get back to you as soon as possible\n\n"
 let catID = await db.get(`category_${reaction.message.guild.id}`)
 var cato = reaction.message.guild.channels.cache.find(x => x.id == catID)

  if(reaction.message.guild === null) return;
  Tr.findOne(
    {
      guildID: reaction.message.guild.id,
     msgid: reaction.message.id
    },
    async (err, tr) => {
      Tickets.findOne(
        {
          guildID: reaction.message.guild.id
        },
        async (err, tickets) => {
         if(!tr) return
          if(tr.msgid !== reaction.message.id) return
          if (!tickets) {
            const newTickets = new Tickets({
              _id: mongoose.Types.ObjectId(),
              guildID: reaction.message.guild.id,
              number: 0,
              role: "Support",
              toggle: "on"
            });
            newTickets.save().catch(err => console.log(err));
          } else {
            let reason = "Opened by reaction"
            if (user.bot == true) return;
            if (!reason) reason = "Opened by reaction";
           
              let emojiName = reaction.emoji.name;
              let member = reaction.message.guild.members.cache.find(
                member => member.id === user.id
              );
              let { cache } = reaction.message.guild.channels;
              let number = tickets.number;
              try {
                if (emojiName == "✉️" && member) {
                  reaction.users.remove(member);
                  let guild = reaction.message.guild;
                  let name = member.user.username.toLowerCase();
                  let everyone = reaction.message.guild.roles.cache.find(
                    role => role.name === "@everyone"
                  );
                  let role = tickets.role;
                  let Support = reaction.message.guild.roles.cache.find(
                    role => role.name === role
                  );
                  let already = reaction.message.guild.channels.cache.find(
                    c =>
                      c.topic ===
                      `Author: ${member.user.username} 
ID: ${member.user.id}`
                  );
                  let open = new Discord.MessageEmbed()
                    .setColor("#9e1c36")
                    .setDescription(
                      `You already have a ticket opened __${already}__.`
                    );
                  if (already)
                    return member
                      .send(open)
                      .catch(err => console.log(err.console));
                  if(cato) {
                  reaction.message.guild.channels.create(`ticket-${number + 1}`, { type: "text", parent: `${catID}` })
                    .then(ticket => {
                      ticket.createOverwrite(reaction.message.guild.roles.cache.find(role => role.name === tickets.role), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                      });
                      ticket.createOverwrite(everyone, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                      });
                      ticket.createOverwrite(member.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                      });
                      //ticket.send('React with ❌ to close this ticket.').then(m => m.react('❌'));
                      ticket.setTopic(`Author: ${member.user.username} 
ID: ${member.user.id}`);

                      const nonedear = new Discord.MessageEmbed()
                        .setDescription(
                        `Dear ${reaction.message.author}, \n\n${description}\n\n`
                        ) 
                        .addField("Subject", `${reason}`) // "Opened by reaction")
                        .setColor(Color)
                        .setFooter(
                          `${client.user.username}`,
                          `${client.user.avatarURL()}`
                        )
                        .setTimestamp();
                      ticket.send({ embed: nonedear });
                    })
                  } else {
                    
                                   reaction.message.guild.channels.create(`ticket-${number + 1}`, { type: "text" })
                    .then(ticket => {
                      ticket.createOverwrite(reaction.message.guild.roles.cache.find(role => role.name === tickets.role), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                      });
                      ticket.createOverwrite(everyone, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                      });
                      ticket.createOverwrite(member.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                      });
                      //ticket.send('React with ❌ to close this ticket.').then(m => m.react('❌'));
                      ticket.setTopic(`Author: ${member.user.username} 
ID: ${member.user.id}`);

                      const nonedear = new Discord.MessageEmbed()
                        .setDescription(
                        `Dear ${reaction.message.author}, \n\n${description}\n\n`
                        )           
                        .addField("Subject", `${reason}`) // "Opened by reaction")
                        .setColor(Color)
                        .setFooter(
                          `${client.user.username}`,
                          `${client.user.avatarURL()}`
                        )
                        .setTimestamp();
                      ticket.send({ embed: nonedear });
                    })
                    
                  }
                  tickets.number = tickets.number + parseInt(1);
                  tickets.save().catch(err => console.log(err));
                }
              } catch (error) {
                console.log(error);
              }
            

           
            console.log(
              "This is a test event, delete me on ./events/message.js"
            );
            
          }
        }
      );
    }
  );
  
  
  
  
  
  
      if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();
    if(user.bot) return;
     let emote = await db1.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.id}`)
    if(!emote) return;
    let messageid = await db1.get(`message_${reaction.message.guild.id}_${reaction.emoji.id}`)
    if(!messageid) return;
    let role = await db1.get(`role_${reaction.message.guild.id}_${reaction.emoji.id}`)
    if(!role) return;
  
    if(reaction.message.id == messageid && reaction.emoji.id == `${emote}`) {
    reaction.message.guild.members.fetch(user).then(member => {
      let embed = new Discord.MessageEmbed()
      .setColor("9e1c36")
      .setAuthor(user.username , user.displayAvatarURL())
      .setDescription(`**It's Looks You Already Have ${reaction.message.guild.roles.cache.get(role).name}** `)
  
      
      if(member.roles.cache.has(role)) return user.send(embed)
      let sucsses = new Discord.MessageEmbed()
      .setColor("9e1c36")
      .setAuthor(user.username, user.displayAvatarURL())
      .setDescription(`**${reaction.message.guild.roles.cache.get(role).name}** Has Been added to you on ${reaction.message.guild.name}`)
  
      
  
      member.roles.add(role) 
      return user.send(sucsses)
    })
    }
  
  
  
  
  
  
  
  
  
  
  
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  if(!emote) return;
  if(!messageid) return;
  if(!role) return;

  if(reaction.message.id == messageid && reaction.emoji.name == `${emote}`) {
  reaction.message.guild.members.fetch(user).then(member => {
    let embed = new Discord.MessageEmbed()
    .setColor("9e1c36")
    .setAuthor(user.username , user.displayAvatarURL())
    .setDescription(`**It's Looks You Already Have ${reaction.message.guild.roles.cache.get(role).name}** `)

    
    if(member.roles.cache.has(role)) return user.send(embed)
    let sucsses = new Discord.MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL())
    .setDescription(`**${reaction.message.guild.roles.cache.get(role).name}** Has Been added to you on ${reaction.message.guild.name}`)

    .setColor("9e1c36")

    member.roles.add(role) 
    return user.send(sucsses)
  })
  }
  
  };