const Discord = require("discord.js")
const Log = require("../models/log.js")
const config = require("../config.json");
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = async (client, role) => {
  
  
  
  Log.findOne({
     guildID: role.guild.id
   }, (err, log) => {
if(log === null) return;
   if(log.toggle === "off") return

   
    if(!role.guild.member(client.user).permissions.has('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).permissions.has('MANAGE_MESSAGES')) return;
  
  
                       
   var logChannel = role.guild.channels.cache.get(log.channel);
    if(!logChannel) return;
	
	//if(role.guild.members.cache.get("689449580437438563")) return
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor;
 
        let roleCreate = new Discord.MessageEmbed()
        .setTitle('**[ROLE CREATE]**')
        .setThumbnail(userAvatar.avatarURL({dynamic:true}))
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('9e1c36')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL({dynamic:true}))
 
logChannel.send(roleCreate)
    })
    })












  const user = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  const entry = user.executor;
  let trustedusers = await db.get(`trustedusers_${role.guild.id}`);
  if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return;
  }
  await db.add(`executer_${role.guild.id}_${role.guild.id}_rolecreate`, 1);
  let author = await db.get(`executer_${role.guild.id}_${entry.id}_rolecreate`);
  let limts = await db.get(`rolecreatelimt_${role.guild.id}`);
  if (limts === null) {
    return;
  }
  let logs = await db.get(`acitonslogs_${role.guild.id}`);
  if (!logs) return;
  if (author > limts) {
    let punishment = await db.get(`punishment_${role.guild.id}`);
    if (punishment === null) punishment = "removerole";
    if (punishment === "roleremove") {
      role.guild.members.cache
        .get(entry.id)
        .roles.cache.map(async userroles => {
          role.guild.members.cache.get(entry.id).roles.remove(userroles.id);
          await db.delete(`executer_${role.guild.id}_${entry.id}_rolecreate`);
          let logsembed = new Discord.MessageEmbed()
            .setThumbnail(entry.avatarURL())
            .setTitle("Protection Log")
            .setColor("9e1c36")
            .setDescription(
              `This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Creating Roles\`
[Breaking Role Creating Limits]`
            )
            .setFooter(role.guild.name, role.guild.iconURL());
          client.channels.cache.get(logs).send(logsembed);
        });
    }
    if (punishment === "ban") {
      role.guild.members.cache.get(entry.id).ban();
      await db.delete(`executer_${role.guild.id}_${entry.id}_rolecreate`);
      let logsembed = new Discord.MessageEmbed()
        .setColor("9e1c36")
        .setThumbnail(entry.avatarURL())
        .setTitle("Protection Log").setDescription(`This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Creating Roles\`
[Breaking Role Creating Limits]`);
      client.channels.cache.get(logs).send(logsembed);
    }
    if (punishment === "kick") {
      role.guild.members.cache.get(entry.id).kick();
      await db.delete(`executer_${role.guild.id}_${entry.id}_rolecreate`);
      let logsembed = new Discord.MessageEmbed()
        .setColor("9e1c36")
        .setThumbnail(entry.avatarURL())
        .setTitle("Protection Log")
        .setDescription(
          `This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Creating Roles\`
[Breaking Role Creating Limits]`
        )
        .setFooter(role.guild.name, role.guild.iconURL());
      client.channels.cache.get(logs).send(logsembed);
    }
    return;
  }
  let warn = await db.get(`executer_${role.guild.id}_${entry.id}_rolecreate`);
  let logsembed = new Discord.MessageEmbed()
    .setColor("9e1c36")
    .setThumbnail(entry.avatarURL())
    .setTitle("Protection Log")
    .setDescription(
      `This User :
Name: \`${entry.username}\`
ID: \`${entry.id}\`
Tag: \`${entry.tag}\`
Made: \`Creating Roles\`
[Creating Roles.. \`${warn || 0}/${author || 0}]\``
    )
    .setFooter(role.guild.name, role.guild.iconURL());
  client.channels.cache.get(logs).send(logsembed);

}
