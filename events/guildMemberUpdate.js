const Log = require ("../models/log.js")
const config = require("../config.json")
const { Database } = require("quickmongo")
const db1 = new Database(config.database);
const Discord = require("discord.js")
module.exports = async (client, oldMember, newMember) => {
Log.findOne({
     guildID: oldMember.guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

   
    if(!oldMember.guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!oldMember.guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
 // if(oldMember.guild.members.cache.get("689449580437438563")) return
                       
   var logChannel = oldMember.guild.channels.cache.get(log.channel);
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL({dynamic:true});
        var userTag = logs.entries.first().executor.tag;
 
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = 'Old Name';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = 'New Name';
            }else {
                var newNM = newMember.nickname;
            }
 
            let updateNickname = new Discord.MessageEmbed()
            .setTitle('**[UPDATE MEMBER NICKNAME]**')
            .setThumbnail(userAvatar)
            .setColor('9e1c36')
            .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** \`\`\`${oldMember.nickname}\`\`\`\n**New Nickname:** \`\`\`${newNM}\`\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldMember.guild.name, oldMember.guild.iconURL({dynamic:true}))
 
logChannel.send(updateNickname)
        }
        if(oldMember.roles.cache.size < newMember.roles.cache.size) {
            let role = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first();
                            
            let roleAdded = new Discord.MessageEmbed()
            .setTitle('**[ADDED ROLE TO MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL({dynamic:true}))
            .setColor('9e1c36')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
logChannel.send(roleAdded)
        }
        if(oldMember.roles.cache.size > newMember.roles.cache.size) {
            let role = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first();
                            
            let roleRemoved = new Discord.MessageEmbed()
            .setTitle('**[REMOVED ROLE FROM MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('9e1c36')
            .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
logChannel.send(roleRemoved)
        }
    })
    if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
                    
        let newOwner = new Discord.MessageEmbed()
        .setTitle('**[UPDATE GUILD OWNER]**')
        .setThumbnail(oldMember.guild.iconURL({dynamic:true}))
        .setColor('9e1c36')
        .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL({dynamic:true}))
 
logChannel.send(newOwner)
    }

if(!oldMember.premiumSince && newMember.premiumSince) {
    let guild_id = "803888603108868097"
  if(newMember.guild.id !== guild_id) return;
  db1.add(`coins.${newMember.id}`, 100000).then(msg => {newMember.send("Thank you for boost our server you clamed 100,000 Coins")})

}
})
}