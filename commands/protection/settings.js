const Discord = require("discord.js");
const config = require("../../config.json");
const { Database } = require("quickmongo");
const db = new Database(config.database);
const ashour = "removerole"
module.exports = {
name: "settings",
run: async (client, message, args, prefix) => {

let cmd = args[0];
if (message.author.id === message.guild.ownerID)  {
const guildicon = message.guild.iconURL({ dynamic: true });
if (!cmd){
        let rolelimt =await db.get(`rolecreatelimt_${message.guild.id}`);
        if (rolelimt === null) rolelimt = "Disabled ";
        let roledelete =await db.get(`roledeletelimts_${message.guild.id}`);
        if (roledelete === null) roledelete = "Disabled ";
        let logschannel =await db.get(`acitonslogs_${message.guild.id}`);
        let logschannel2 = await db.get(`acitonslogs_${message.guild.id}`);
        if (logschannel === null) logschannel = "Disabled ";
        else logschannel = `<#${logschannel2}>`;
        let channelcreatelimts =await db.get(`channelcreatelimts_${message.guild.id}`);
        if (channelcreatelimts === null) channelcreatelimts = "Disabled";
        let channeldeletelimts = await db.get(`channeldeletelimts_${message.guild.id}`);
        if (channeldeletelimts === null) channeldeletelimts = "Disabled";
        let banlimts = await db.get(`banlimts_${message.guild.id}`);
        if (banlimts === null) banlimts = "Disabled ";
        let kicklimts = await db.get(`kicklimts_${message.guild.id}`);
        if (kicklimts === null) kicklimts = "Disabled ";
        let punishment = await db.get(`punishment_${message.guild.id}`);
        if (ashour === null) ashour = "None";
        if (punishment === null) punishment = ashour;
        let showembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
        .setColor("9e1c36")
        .setTitle(`⚙️ ${message.guild.name} Config   `)
        .setDescription(`\`${prefix}settings ban\` | Current: \`${banlimts}\`
\`${prefix}settings kick\` | Current: \`${kicklimts}\`
\`${prefix}settings rolecreate\` | Current: \`${rolelimt}\`
\`${prefix}settings roledelete\` | Current: \`${roledelete}\`
\`${prefix}settings channelcreate\` | Current: \`${channelcreatelimts}\`
\`${prefix}settings channeldelete\` | Current: \`${channeldeletelimts}\`
\`${prefix}settings punishment\` | Current: \`${punishment}\`
\`${prefix}settings Channel-Log\` | Current: ${logschannel}
`)        .setFooter(`In order not to face problems, make sure that the bot's role highest`, guildicon)
     .setTimestamp()
        return message.channel.send(showembed);
      }
      if (cmd.toLowerCase() === "rolecreate") {
        let rolecreate = args.slice(1).join(" ");
        if (!rolecreate) {
          let missing = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
            .setDescription(
              `ERROR
**Usage:**
\`\`\`diff
- ${prefix}settings rolecreate (number)\`\`\``
            )
            
            .setColor("9e1c36");
          return message.channel.send(missing);
        }
        if (isNaN(rolecreate)) {
          let missing = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
            .setDescription(
              `ERROR
**Usage:**
\`\`\`diff
- An invaild usage (Cannot be words only numbers)\`\`\``
            )
            
            .setColor("9e1c36");
          return message.channel.send(missing);
        }
       await db.set(`rolecreatelimt_${message.guild.id}`, rolecreate);
        let done = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription(
            `**
RoleCreation Limits Has Been Set To:**
\`\`\`diff
+ ${rolecreate}\`\`\``
          )
          .setColor("9e1c36")
          ;
        return message.channel.send(done);
      }
      if (cmd.toLowerCase() === "roledelete") {
        let roledelete = args.slice(1).join(" ");
        if (!roledelete) {
          let missing = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
            .setDescription( `
**Usage:**
\`\`\`diff
- ${prefix}settings roledelete (number)\`\`\``
            )
            
            .setColor("9e1c36");

          return message.channel.send(missing);
        }
        if (isNaN(roledelete)) {
          let missing = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
              .setDescription(
             `
**Usage:**
\`\`\`diff
- An invaild usage (Cannot be words only numbers)\`\`\``
            )
            
            .setColor("9e1c36");
          return message.channel.send(missing);
        }
        await db.set(`roledeletelimts_${message.guild.id}`, roledelete);
        let done = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
            .setDescription(
            `
RoleDelete Limts Has Been Set To:
\`\`\`diff
+ ${roledelete}\`\`\``
          )
          .setColor("9e1c36")
          ;
        return message.channel.send(done);
      }
      if (cmd.toLowerCase() === "channel-log") {
        let logs = message.mentions.channels.first();
        if (!logs) {
          let logsembed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
             .setDescription(
              `
\`\`\`diff
- Please Mention an vaild channel\`\`\``
            )
            
            .setColor("9e1c36");
          return message.channel.send(logsembed);
        }
          
       await db.set(`acitonslogs_${message.guild.id}`, logs.id);
        let done = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
          .setDescription(`**
           Channel Action-logs channel has been set to ${logs}**
          `)
          .setColor("9e1c36")
          ;
        return message.channel.send(done);
      }
      if (cmd.toLowerCase() === "channelcreate") {
let rolecreate = args.slice(1).join(" ");
if (!rolecreate) {
let missing = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(
`
**Usage:**
\`\`\`diff
- ${prefix}settings channelcreate (number)\`\`\``
) .setColor("9e1c36");
return message.channel.send(missing);
}if (isNaN(rolecreate)) {
let missing = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
 .setDescription(`
**Usage:**
\`\`\`diff
- An invaild usage (Cannot be words only numbers)\`\`\``
            )
            
            .setColor("9e1c36");
          return message.channel.send(missing);
        }
        await db.set(`channelcreatelimts_${message.guild.id}`, rolecreate);
        let done = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
      .setDescription(
            `
ChannelCreate Limts Has Been Set To:
\`\`\`diff
+ ${rolecreate}\`\`\``
          )
          .setColor("9e1c36")
          ;
        return message.channel.send(done);
      }
      if (cmd.toLowerCase() === "channeldelete") {
        let rolecreate = args.slice(1).join(" ");
        if (!rolecreate) {
          let missing = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`**Usage:**
\`\`\`diff
- ${prefix}settings channeldelete (number)\`\`\``)
.setColor("9e1c36");
 return message.channel.send(missing);
}
if (isNaN(rolecreate)) {
let missing = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`
**Usage:**
\`\`\`diff
- An invaild usage (Cannot be words only numbers)\`\`\``
)
.setColor("9e1c36");
return message.channel.send(missing);
}
await db.set(`channeldeletelimts_${message.guild.id}`, rolecreate);
let done = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(
`**ChannelDelete Limts Has Been Set To:**
\`\`\`diff
+ ${rolecreate}\`\`\``
)
.setColor("9e1c36")
;
return message.channel.send(done);
}
if (cmd.toLowerCase() === "ban") {
let rolecreate = args.slice(1).join(" ");
if (!rolecreate) {
let missing = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`
**Usage:**
\`\`\`diff
- ${prefix}settings ban (number)\`\`\``
)

.setColor("9e1c36");
return message.channel.send(missing);}
if (isNaN(rolecreate)) {
let missing = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
 .setDescription(`
\`\`\`diff
- An invaild usage (Cannot be words only numbers)\`\`\``)

.setColor("9e1c36");
return message.channel.send(missing);}
await db.set(`banlimts_${message.guild.id}`, rolecreate);
let done = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`
Ban Limts Has Been Set To
\`\`\`diff
+ ${rolecreate}\`\`\``)
.setColor("9e1c36")
return message.channel.send(done);
}
if (cmd.toLowerCase() === "kick") {
let rolecreate = args.slice(1).join(" ");if (!rolecreate) {
let missing = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`
**Usage:**
\`\`\`diff
- ${prefix}settings kick (number)\`\`\``)

.setColor("9e1c36");
return message.channel.send(missing);}
if (isNaN(rolecreate)) {
let missing = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`**Usage:**
\`\`\`diff
- An invaild usage (Cannot be words only numbers)\`\`\``)
.setColor("9e1c36");
return message.channel.send(missing);}
await db.set(`kicklimts_${message.guild.id}`, rolecreate);
let done = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`
Kick Limts Has Been Set To:
\`\`\`diff
+ ${rolecreate}\`\`\``
)
.setColor("9e1c36")
;
return message.channel.send(done);
}
if (cmd.toLowerCase() === "punishment") {
let argsp = args[1];
let embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
 .setDescription(`Punishment
Choose Punishment method :
\`\`\`ini
[kick | roleremove | ban]\`\`\`
`)
.setColor('9e1c36')
 if (!argsp) return message.channel.send(embed);
if (argsp.toLowerCase() === "kick") {
let embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(
`**Punishment Was Changed to:**
\`\`\`diff
+ kick\`\`\``)
.setColor("9e1c36")
;
await db.set(`punishment_${message.guild.id}`, "kick");
return message.channel.send(embed);
}
if (argsp.toLowerCase() === "ban") {
let embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setColor("9e1c36")
.setDescription(`Punishment Was Changed to \`Ban\``)
.setFooter(message.guild.name, guildicon);
await db.set(`punishment_${message.guild.id}`, "ban");
return message.channel.send(embed);
}
if (argsp.toLowerCase() === "roleremove") {
let embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setColor("9e1c36")
.setDescription(`Punishment Was Changed to \`RoleRemove\``)
await db.set(`punishment_${message.guild.id}`, "roleremove");
return message.channel.send(embed);
}
}
return;
}
return message.channel.send(new Discord.MessageEmbed()
                            .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Only owner can use that cmd!` ).setColor("9e1c36"));
}
};
