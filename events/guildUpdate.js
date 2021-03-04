const Discord = require("discord.js")
const Log = require("../models/log.js")
module.exports = async (client, oldGuild, newGuild) =>{
  Log.findOne({
     guildID: oldGuild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

   
    if(!oldGuild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!oldGuild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
 // if(oldGuild.members.cache.get("689449580437438563")) return
                       
   var logChannel = oldGuild.channels.cache.get(log.channel);
    if(!logChannel) return;
 
    oldGuild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL({dynamic:true});
 
        if(oldGuild.name !== newGuild.name) {
            let guildName = new Discord.MessageEmbed()
            .setTitle('**[CHANGE GUILD NAME]**')
            .setThumbnail(userAvatar)
            .setColor('9e1c36')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild name.\n\n**Old Name:** \`\`${oldGuild.name}\`\`\n**New Name:** \`\`${newGuild.name}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(newGuild.name, oldGuild.iconURL({dynamic:true}))
 
logChannel.send(guildName)
        }
        if(oldGuild.region !== newGuild.region) {
            let guildRegion = new Discord.MessageEmbed()
            .setTitle('**[CHANGE GUILD REGION]**')
            .setThumbnail(userAvatar)
            .setColor('9e1c36')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild region.\n\n**Old Region:** \`\`${oldGuild.region.toUpperCase()}\`\`\n**New Region:** \`\`${newGuild.region.toUpperCase()}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldGuild.name, oldGuild.iconURL({dynamic:true}))
 
logChannel.send(guildRegion)
        }
        if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
            if(oldGuild.verificationLevel === 0) {
                var oldVerLvl = 'Very Easy';
            }else
            if(oldGuild.verificationLevel === 1) {
                var oldVerLvl = 'Easy';
            }else
            if(oldGuild.verificationLevel === 2) {
                var oldVerLvl = 'Medium';
            }else
            if(oldGuild.verificationLevel === 3) {
                var oldVerLvl = 'Hard';
            }else
            if(oldGuild.verificationLevel === 4) {
                var oldVerLvl = 'Very Hard';
            }
 
            if(newGuild.verificationLevel === 0) {
                var newVerLvl = 'Very Easy';
            }else
            if(newGuild.verificationLevel === 1) {
                var newVerLvl = 'Easy';
            }else
            if(newGuild.verificationLevel === 2) {
                var newVerLvl = 'Medium';
            }else
            if(newGuild.verificationLevel === 3) {
                var newVerLvl = 'Hard';
            }else
            if(newGuild.verificationLevel === 4) {
                var newVerLvl = 'Very Hard';
            }
            let verLog = new Discord.MessageEmbed()
            .setTitle('**[GUILD VERIFICATION LEVEL CHANGE]**')
            .setThumbnail(userAvatar)
            .setColor('9e1c36')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Guild Verification level.\n\n**Old Verification Level:** \`\`${oldVerLvl}\`\`\n**New Verification Level:** \`\`${newVerLvl}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldGuild.name, oldGuild.iconURL({dynamic:true}))
 
logChannel.send(verLog)
        }
    })
})
}