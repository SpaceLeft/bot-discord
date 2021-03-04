const Discord = require("discord.js")
const Log = require("../models/log.js")
module.exports = async (client, message) =>{
  
  	if(!message.guild) return;
   Log.findOne({
     guildID: message.guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!message.guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
  
                       
   var logChannel = message.guild.channels.cache.get(log.channel);
    if(!logChannel) return;
	   
	//   if(message.guild.members.cache.get("689449580437438563")) return
 
    let messageDelete = new Discord.MessageEmbed()
    .setTitle('**[MESSAGE DELETE]**')
    .setColor('9e1c36')
    .setThumbnail(message.author.avatarURL({dynamic:true}))
    .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
    if(message.content.endsWith('.png') || message.content.endsWith('.jpg') || message.content.endsWith('.web') || message.content.endsWith('.webp') || message.content.endsWith('.jpeg') ||  message.content.endsWith('.gif')) return;

logChannel.send(messageDelete)
})
  
}