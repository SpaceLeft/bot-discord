
 const language = "en";
 const { MessageEmbed } = require("discord.js")
const ms = require("ms");
 const deb = require("quick.db")
module.exports = {
    name: "mute",
    description: "mute member",
    permissions: 'MANAGE_ROLES',
    run: async (client, message, args, db, prefix) => {


     let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) 
     let userembed = new MessageEmbed()
     .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
     .setTitle(`Command : Mute`)
    .setDescription(`
    Mute a member from text channels so they cannot type.
  
     **Usage**:
     ${prefix}mute (user) (time ends with m,h,d,mo,y) (reason)
      
     **Examples:**
     ${prefix}mute ${message.author} 1m spamming
     ${prefix}mute ${message.author} 1h
     ${prefix}mute ${message.author} 1d
     ${prefix}mute ${message.author} 1mo
     ${prefix}mute ${message.author} 1y
    `)
     .setColor("9c1c34")
     if(!user) return message.channel.send(userembed)
     let timea = args[1];
   if(!timea) {
    let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
    if(!muterole) {
            message.guild.roles.create({
               data: {
                 name: 'Muted',
                 color: 'gray',
               },
               reason: 'Mute Role!',
             }).then(async role => {
        message.guild.channels.cache.forEach(darkboy => {
              darkboy.updateOverwrite(role, { SEND_MESSAGES: false })
        db.set(`muterole_${message.guild.id}`, role.id)
             })       
           })
        }
        message.guild.members.fetch(user).then(member => {
            let fff = message.guild.roles.cache.find(role => role.name === "Muted");

            member.roles.add(fff.id)

return message.channel.send(new MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(`**${user} Muted From Text**`).setColor("9c1c34"))

      return;
        })   
        return;        
  }
  
     
if(!args[1])

return message.channel.send(new MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`time limit must equals one of (h, d, w, m, y)`).setColor("9c1c34"))

let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
  if(!muterole) {
          message.guild.roles.create({
             data: {
               name: 'Muted',
               color: 'gray',
             },
             reason: 'Mute Role!',
           }).then(async role => {
      message.guild.channels.cache.forEach(darkboy => {
            darkboy.updateOverwrite(role, { SEND_MESSAGES: false })
      db.set(`muterole_${message.guild.id}`, role.id)
           })       
         })
      
      message.guild.members.fetch(user).then(member => {
          let fff = message.guild.roles.cache.find(role => role.name === "Muted");

          member.roles.add(fff.id)
 
return message.channel.send(new MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(`**${user} Muted From Text**`).setColor("9c1c34"))
 })  
}  
message.guild.members.fetch(user).then(member => {
    let fff = message.guild.roles.cache.find(role => role.name === "Muted");
console.log(`${ms(args[0])}`)
    member.roles.add(fff.id)

return message.channel.send(new MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(`**${user} Muted From Text**`).setColor("9c1c34"))
 
setTimeout(function(){
   member.roles.remove(fff.id)
}, ms(args[1]));
}) 

}}