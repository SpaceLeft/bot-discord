
const Discord = require("discord.js")
const Log = require("../models/log.js")
const config = require("../config.json");
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = async (client, channel) =>{
  if(!channel.guild) return;
Log.findOne({
     guildID: channel.guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

   
    if(!channel.guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
//  if(channel.guild.members.cache.get("689449580437438563")) return
                       
   var logChannel = channel.guild.channels.cache.get(log.channel);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL({dynamic:true});
 
        let channelCreate = new Discord.MessageEmbed()
        .setTitle('**[CHANNEL CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('9e1c36')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL({dynamic:true}))
 
logChannel.send(channelCreate)
    })
   })


















 const user = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());
  const entry = user.executor;
  let trustedusers = await db.get(`trustedusers_${channel.guild.id}`);
  if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return;
  }
  await db.add(`executer_${channel.guild.id}_${entry.id}_channelcreate`, 1);
  let author = await db.get(
    `executer_${channel.guild.id}_${entry.id}_channelcreate`
  );
  let limts = await db.get(`channelcreatelimts_${channel.guild.id}`);
  if (limts === null) {
    return;
  }
  let logs = await db.get(`acitonslogs_${channel.guild.id}`);
  if (!logs) return;
  if (author > limts) {
    let punishment = await db.get(`punishment_${channel.guild.id}`);
    if (punishment === null) punishment = "roleremove";
    if (punishment === "roleremove") {
      channel.guild.members.cache
        .get(entry.id)
        .roles.cache.map(async userroles => {
          channel.guild.members.cache.get(entry.id).roles.remove(userroles.id);
          await db.delete(
            `executer_${channel.guild.id}_${entry.id}_channelcreate`
          );
          let logsembed = new Discord.MessageEmbed()
            .setThumbnail(entry.avatarURL())
            .setFooter(channel.guild.name, channel.guild.iconURL())
            .setTitle("Protection Log")
            .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Creating Channels\`
[Breaking Channel Create Limits]`);
          client.channels.cache.get(logs).send(logsembed);
        });
    }
    if (punishment === "ban") {
      channel.guild.members.cache.get(entry.id).ban();
      await db.delete(`executer_${channel.guild.id}_${entry.id}_channelcreate`);
      let logsembed = new Discord.MessageEmbed()
        .setThumbnail(entry.avatarURL())
        .setFooter(channel.guild.name, channel.guild.iconURL())
        .setTitle("Protection Log")
        .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Creating Channels\`
[Breaking Channel Create Limits]`);
      client.channels.cache.get(logs).send(logsembed);
    }
    if (punishment === "kick") {
      channel.guild.members.cache.get(entry.id).kick();
      await db.delete(`executer_${channel.guild.id}_${entry.id}_channelcreate`);
      let logsembed = new Discord.MessageEmbed()
        .setThumbnail(entry.avatarURL())
        .setFooter(channel.guild.name, channel.guild.iconURL())
        .setTitle("Protection Log")
        .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Creating Channels\`
[Breaking Channel Create Limts]`);
      client.channels.cache.get(logs).send(logsembed);
    }
    return;
  }
  let warn = await db.get(
    `executer_${channel.guild.id}_${entry.id}_channelcreate`
  );
  let logsembed = new Discord.MessageEmbed()
    .setThumbnail(entry.avatarURL())
    .setFooter(channel.guild.name, channel.guild.iconURL())
    .setTitle("Protection Log")
    .setColor("9e1c36").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Creating Channels\`
[Creating channel.. \`${warn || 0}/${author || 0}]\``);
  client.channels.cache.get(logs).send(logsembed);
}
