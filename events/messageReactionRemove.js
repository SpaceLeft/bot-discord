const db = require("quick.db");
const Discord = require("discord.js");
const config = require('../config.json')
const { Database } = require("quickmongo");
const db1 = new Database(config.database);
module.exports = async (client, reaction, user) => {

    if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  let emote = await db1.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.name}`)
  if(!emote) return;
  let messageid = await db1.get(`message_${reaction.message.guild.id}_${reaction.emoji.name}`)
  if(!messageid) return;
  let role = await db1.get(`role_${reaction.message.guild.id}_${reaction.emoji.name}`)
  if(!role) return;
   if(reaction.message.id == messageid && reaction.emoji.name == `${emote}`) {
    reaction.message.guild.members.fetch(user).then(member => {
    
   let embed = new Discord.MessageEmbed()
   .setAuthor(user.username , user.displayAvatarURL())
   .setDescription(`**${reaction.message.guild.roles.cache.get(role).name}** Role Removed From You!`)

   
   .setColor("9e1c36")
   user.send(embed)
   member.roles.remove(role)
    
  })
  }
  
  
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  if(!emote) return;
  if(!messageid) return;
  if(!role) return;
   if(reaction.message.id == messageid && reaction.emoji.id == `${emote}`) {
    reaction.message.guild.members.fetch(user).then(member => {

   let embed = new Discord.MessageEmbed()
   .setAuthor(user.username , user.displayAvatarURL())
   .setDescription(`**${reaction.message.guild.roles.cache.get(role).name}** Role Removed From You!`)

   
   .setColor("9e1c36")
   user.send(embed)
   member.roles.remove(role)
    
  })
  }
  
}