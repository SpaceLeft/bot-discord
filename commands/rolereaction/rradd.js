 
const Discord = require("discord.js")
const config = require("../../config.json")
const { Database } = require("quickmongo");
const db = new Database(config.database);
 module.exports = {
    name: "rradd",
    description: "set auto-partner channel",
    permissions: 'MANAGE_ROLES',
    run: async (client, message, args, prefix) => {
    let channel = message.mentions.channels.first();
    if(!channel) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`${prefix}rradd #channeL MESSAGEID ROLE EMOJI`).setColor("9e1c36"))
        if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${prefix}rradd ${channel} MESSAGEID ROLE EMOJI`))        
    
    let messageid = client.channels.cache.get(`${channel.id}`).messages.fetch(`${args[1]}`)
     if(!messageid) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**That's not an vaild message iD** `))
    
    if(isNaN(args[1])) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Message ID Must Be ANumber`))
    let role = message.mentions.roles.first();
    if(!role) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${prefix}rradd ${channel} ${args[1]} @role Emoji`))
    let check = message.guild.roles.cache.find(r => r.name === `${role.name}`)
    if(!check) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`Please give a vaild role name.`))
    if(!args[3]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${prefix}rradd ${channel} ${args[1]} ${role.name} EMOJI`))
    function isCustomEmoji(emoji) {
        return emoji.split(":").length == 1 ? false : true;
      }
      if (isCustomEmoji(args[3])) {
      let customemoji = Discord.Util.parseEmoji(args[3]);
    let emojicheck = client.emojis.cache.find(emoji => emoji.id === `${customemoji.id}`);
    if(!emojicheck) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`Please give a vaild emoji`))
  let embed = new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
 .setThumbnail(message.guild.iconURL())
 .setTitle(`Reaction Role Sucsses!`)
 .setColor("9e1c36")
 .setDescription(`**Done!**
 
 ** [Go To Message](https://discord.com/channels/${message.guild.id}/${channel.id}/${args[1]})
  Role : ${role}
  [Emoji](https://cdn.discordapp.com/emojis/${emojicheck.id}.png?v=1) : ${emojicheck}
  Channel : ${channel}**
 `)
 
 

     client.channels.cache.get(`${channel.id}`).messages.fetch(`${args[1]}`).then(a => {
         a.react(emojicheck.id)
      db.set(`rrremove_${message.guild.id}_${args[1]}2`, channel.id)
     db.set(`rrremove_${message.guild.id}_${args[1]}_${args[3]}`, emojicheck.id)
      db.set(`rerremove_${message.guild.id}_${args[1]}`, args[1])
     db.set(`emoteid_${message.guild.id}_${emojicheck.id}`, emojicheck.id)
     db.set(`role_${message.guild.id}_${emojicheck.id}`, role.id)
     db.set(`message_${message.guild.id}_${emojicheck.id}`, args[1])
     return;    
    })
         return;
    }
      db.set(`rrremove_${message.guild.id}_${args[1]}2`, channel.id)
     db.set(`rrremove_${message.guild.id}_${args[1]}_${args[3]}`, args[3])
     db.set(`rerremove_${message.guild.id}_${args[1]}`, args[1])
     db.set(`emoteid_${message.guild.id}_${args[3]}`, args[3])
     db.set(`role_${message.guild.id}_${args[3]}`, role.id)
     db.set(`message_${message.guild.id}_${args[3]}`, args[1])
     let embed = new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
     .setThumbnail(message.guild.iconURL())
     .setTitle(`Reaction Role Sucsses!`)
     .setColor("9e1c36")
     .setDescription(`**Done!**
     
     **[Go To Message](https://discord.com/channels/${message.guild.id}/${channel.id}/${args[1]})
     Role : ${role}
     Emoji: ${args[3]}
     Channel : ${channel}**
     `)
     
     
    
        message.channel.send(embed)
         client.channels.cache.get(`${channel.id}`).messages.fetch(`${args[1]}`).then(a => {
             a.react(args[3])
         })    
    }}
