
const Discord = require("discord.js")
const Log = require("../models/log.js")
module.exports = async (client, oldMessage, newMessage) =>{
  
  if(!oldMessage.guild) return;
Log.findOne({
     guildID: oldMessage.guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

    if(oldMessage.author.bot) return;
    if(oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
  
                       
   var logChannel = oldMessage.guild.channels.cache.get(log.channel);
    if(!logChannel) return;
	
	//if(oldMessage.guild.members.cache.get("689449580437438563")) return
 
    if(oldMessage.content.startsWith('https://')) return;
 
    let messageUpdate = new Discord.MessageEmbed()
    .setTitle('**[MESSAGE EDIT]**')
    .setThumbnail(oldMessage.author.avatarURL({dynamic:true}))
    .setColor('9e1c36')
    .setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL({dynamic:true}))
 
logChannel.send(messageUpdate)
   })
  
}