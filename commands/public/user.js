
const moment = require("moment");
const Discord = require("discord.js");
const language = "en"
const db = require("quick.db")
module.exports = {
    name: "user",
    cooldown: 5,
    description: "show user info",
  run: async (client, message) => {
     
       var lang = await db.fetch(`lang_${message.guild.id}`);
                        if (lang == null) lang = language;


const args = message.content.split(' ');
    let avt = `${message.author.avatarURL()}`;
    let id1 = `https://images-ext-1.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif`
const mention = message.mentions.users.first() || message.author;
            let embed = new Discord.MessageEmbed() 
.addField('**Username :**',` \`\`\`➥ ${mention.tag}\`\`\` `)
.addField('**User ID :**', ` \`\`\`➥ ${mention.id}\`\`\` `)
.addField('**Created At :**', ` \`\`\`➥ ${moment(mention.createdTimestamp).format('YYYY/MM/DD HH:mm')}\`\`\` `)
.addField('**Joined At :**', ` \`\`\`➥ ${moment(mention.joinedTimestamp).format('YYYY/MM/DD HH:mm')}\`\`\` `)
.setColor("9e1c36")
.setThumbnail(`${mention.avatarURL()}` , ({format : "png" , dynamic : true , size : "1024"}))
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
 
message.channel.send(embed);
}}