

const Discord = require("discord.js")
const Log = require("../models/log.js")
module.exports = async (client, oldChannel, newChannel) =>{
  if(!oldChannel.guild) return;
Log.findOne({
     guildID: oldChannel.guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

   
    if(!oldChannel.guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!oldChannel.guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
 // if(oldChannel.guild.members.cache.get("689449580437438563")) return
                       
   var logChannel = oldChannel.guild.channels.cache.get(log.channel);
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
 
    oldChannel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL({dynamic:true});
 
        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.MessageEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('9e1c36')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL({dynamic:true}))
 
logChannel.send(newName)
        }
        if(oldChannel.topic !== newChannel.topic) {
            
            let newTopic = new Discord.MessageEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('9e1c36')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL({dynamic:true}))
 
logChannel.send(newTopic)
        }
    })
   })
}
