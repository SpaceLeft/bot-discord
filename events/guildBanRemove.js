const Discord = require("discord.js")
const Log = require("../models/log.js")
module.exports = async (client, guild, user) => {
  Log.findOne({
     guildID: guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

   
    if(!guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
  //if(guild.members.cache.get("689449580437438563")) return
                       
   var logChannel = guild.channels.cache.get(log.channel);
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL({dynamic:true});
 
        if(userID === client.user.id) return;
 
        let unBanInfo = new Discord.MessageEmbed()
        .setTitle('**[UNBANNED]**')
        .setThumbnail(userAvatar)
        .setColor('9e1c36')
        .setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL({dynamic:true}))
 
logChannel.send(unBanInfo)
    })
})
}