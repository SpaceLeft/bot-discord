 
const Discord = require("discord.js")
const config = require("../../config.json")
const { Database } = require("quickmongo");
const db = new Database(config.database);
 module.exports = {
    name: "rrdelete",
    description: "set auto-partner channel",
    permissions: 'MANAGE_ROLES',
    run: async (client, message, args, prefix) => {
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${prefix}rrdelete (messageid) (emoji)`))
    let channel = await db.get(`rrremove_${message.guild.id}_${args[0]}2`)
    let messageid = await db.get(`rerremove_${message.guild.id}_${args[0]}`)

    if(!channel) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**I can't find this channel**`))
    if(!messageid) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**I can't find this Message id**`))
    let a = client.channels.cache.get(channel).messages.fetch(args[0])
   if(!a) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**I can't find this Message id**`))
   if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${prefix}rrdelete (mesageid) (emoji)`))
   function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    if (isCustomEmoji(args[1])) {

   let customemoji = Discord.Util.parseEmoji(args[1]);
    let emojicheck = client.emojis.cache.find(emoji => emoji.id === `${customemoji.id}`);
    if(!emojicheck) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`Please give a vaild emoji`))

   let emote = await db.get(`rrremove_${message.guild.id}_${args[0]}_${args[1]}`)
   if(!emote) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`theres no emojis with ${emojicheck} on ${args[0]}`))
   client.channels.cache.get(channel).messages.fetch(args[0]).then(darkcodes => {
darkcodes.reactions.cache.get(`${emojicheck.id}`).remove() 
   })

   let embed = new Discord.MessageEmbed()
   .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36")
        .setDescription(`**Sucsses**
        Removed  **[Go To Message](https://discord.com/channels/${message.guild.id}/${channel}/${args[0]})**
      Reaciton Cleared 
      Reaciton Role Removed.`)
        
        
       message.channel.send(embed)
       db.delete(`emoteid_${message.guild.id}_${emojicheck}`)
       db.delete(`emojistatus_${args[0]}_${args[1]}`)
       db.delete(`role_${message.guild.id}_${emojicheck}`)
       db.delete(`message_${message.guild.id}_${emojicheck}`)
       db.delete(`rrremove_${message.guild.id}_${args[0]}2`)
       db.delete(`rrremove_${message.guild.id}_${args[0]}_${args[1]}`)
       db.delete(`rerremove_${message.guild.id}_${args[0]}`)
       return;
}
client.channels.cache.get(channel).messages.fetch(args[0]).then(darkcodes => {
   darkcodes.reactions.cache.get(`${args[1]}`).remove() 
      })
   
      let embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
           .setColor("9e1c36")
           .setDescription(`**Sucsses**
           Removed  ** [Go To Message](https://discord.com/channels/${message.guild.id}/${channel}/${args[0]})**
        Reaciton Cleared 
        Reaciton Role Removed.`)
           
           
           message.channel.send(embed)
          db.delete(`emojistatus_${args[0]}_${args[1]}`)
          db.delete(`emoteid_${message.guild.id}_${args[1]}`)
          db.delete(`role_${message.guild.id}_${args[1]}`)
          db.delete(`message_${message.guild.id}_${args[1]}`)
          db.delete(`rrremove_${message.guild.id}_${args[0]}2`)
          db.delete(`rrremove_${message.guild.id}_${args[0]}_${args[1]}`)
          db.delete(`rerremove_${message.guild.id}_${args[0]}`)
   
 }}
