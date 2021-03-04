
const Discord = require("discord.js")
const Log = require("../models/log.js")
module.exports = async (client, oldRole, newRole) => {
  Log.findOne({
     guildID: oldRole.guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

   
    if(!oldRole.guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!oldRole.guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
 // if(oldRole.guild.members.cache.get("689449580437438563")) return
                       
   var logChannel = oldRole.guild.channels.cache.get(log.channel);
    if(!logChannel) return;
 
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor;
 
        if(oldRole.name !== newRole.name) {
            
            let roleUpdateName = new Discord.MessageEmbed()
            .setTitle('**[ROLE NAME UPDATE]**')
            .setThumbnail(userAvatar.avatarURL({dynamic:true}))
            .setColor('9e1c36')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL({dynamic:true}))
 
logChannel.send(roleUpdateName)
        }
        if(oldRole.hexColor !== newRole.hexColor) {
            if(oldRole.hexColor === '#000000') {
                var oldColor = '`Default`';
            }else {
                var oldColor = oldRole.hexColor;
            }
            if(newRole.hexColor === '#000000') {
                var newColor = '`Default`';
            }else {
                var newColor = newRole.hexColor;
            }
            
            let roleUpdateColor = new Discord.MessageEmbed()
            .setTitle('**[ROLE COLOR UPDATE]**')
            .setThumbnail(userAvatar.avatarURL({dynamic:true}))
            .setColor('9e1c36')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL({dynamic:true}))
 
logChannel.send(roleUpdateColor)
        }
    })
   })
}