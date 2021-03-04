const Discord = require("discord.js")
const Log = require("../models/log.js")
module.exports = async (client, oldState, newState) => {
	if(!oldState.guild) return;
 Log.findOne({
     guildID: oldState.guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return;

   
  //  if(!oldState.guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    //if(!oldState.guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
  //if(oldState.guild.members.cache.get("689449580437438563")) return
                       
   var logChannel = oldState.guild.channels.cache.get(log.channel);
    if(!logChannel) return;
 
    oldState.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userTag = logs.entries.first().executor.tag;
        var userAvatar = logs.entries.first().executor.avatarURL({dynamic:true});
 
        if(oldState.guild.serverMute === false && newState.guild.serverMute === true) {
            let serverMutev = new Discord.MessageEmbed()
            .setTitle('**[VOICE MUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
            .setColor('9e1c36')
            .setDescription(`**User:** ${oldState} (ID: ${oldState.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverMutev);
        }
        if(oldState.guild.serverMute === true && newState.guild.serverMute === false) {
                            
            let serverUnmutev = new Discord.MessageEmbed()
            .setTitle('**[VOICE UNMUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
            .setColor('9e1c36')
            .setDescription(`**User:** ${oldState} (ID: ${oldState.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUnmutev);
        }
        if(oldState.guild.serverDeaf === false && newState.guild.serverDeaf === true) {
                            
            let serverDeafv = new Discord.MessageEmbed()
            .setTitle('**[VOICE DEAF]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
            .setColor('9e1c36')
            .setDescription(`**User:** ${oldState} (ID: ${oldState.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverDeafv);
        }
        if(oldState.guild.serverDeaf === true && newState.guild.serverDeaf === false) {
                            
            let serverUndeafv = new Discord.MessageEmbed()
            .setTitle('**[VOICE UNDEAF]**')
            .setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
            .setColor('9e1c36')
            .setDescription(`**User:** ${oldState} (ID: ${oldState.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUndeafv);
        }
    })
   
    if(oldState.voiceChannel !== newState.voiceChannel && newState.voiceChannel && oldState.voiceChannel != null) {
                        
        let voiceLeave = new Discord.MessageEmbed()
        .setTitle('**[CHANGED VOICE ROOM]**')
        .setColor('9e1c36')
        .setThumbnail(oldState.user.avatarURL)
        .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannel})\n**To:** \`\`${newState.voiceChannel.name}\`\` (ID: ${newState.voiceChannel})\n**User:** ${oldState} (ID: ${oldState.id})`)
        .setTimestamp()
        .setFooter(oldState.user.tag, oldState.user.avatarURL)
 
        logChannel.send(voiceLeave);
    }
   })
}

