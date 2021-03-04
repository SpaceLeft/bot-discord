
const Discord = require("discord.js");
const db = require("quick.db")
const language = "en"
module.exports = {
    name: "commands",
    description: "close all ticket in server",
    cooldown: 5,
    run: async (client, message, args) => {
 


  const embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setDescription(`
  **Public commands**

 \`avatar\`, \`corona\`, \`help\`, \`short\`, \`translate\`, \`user\`, \`ping\`, \`server\`, \`bot\`, \`ravatar\`

  **Moderation commands**

 \`addemoji\`, \`aliase\`, \`ban\`, \`clear\`, \`embed\`, \`hide\`, \`kick\`, \`lock\`, \`mute\`, \`role\`, \`setlang\`, \`setprefix\`, \`toogle\`, \`unhide\`, \`unlock\`, \`unmute\`, \`vkick\`, \`moveroles\`, \`transferroles\`, \`roles\` 

**Protection commands**

 \`settings\`, \`antispam\`, \`whitelist-add\`, \`whitelist-delete\`, \`whitelist\`
  
**Ticket commands**
 
 \`tr\`, \`add\`, \`remove\`, \`new\`, \`rename\`, \`close\`, \`close-all\`, \`ticket-role\`, \`ticket-number\`, \`ticket-toggle\`, \`ticket-description\`, \`ticket-config\`, \`ticket-category\`
 
 **Fun commands**

 \`aki\`, \`emoji\`, \`fakebot\`, \`اسرع\`, \`فكك\`, \`hug\`, \`kill\`, \`kiss\`, \`kt\`, \`slap\`, \`points\`, \`trash\`, \`wanted\`, \`love\`
  
 **Economy commands**
 
 \`profile\`, \`coins\`, \`daily\`, \`rep\`, \`pay\`, \`title\`, \`background\`, \`background-remove\`
 
 **Badwords commands**

 \`addword\`, \`delword\`, \`wordlist\`

 **Giveaway commands**

 \`gstart\`, \`gend\`, \`greroll\`, \`gsetrole\`, \`gblacklist\`, \`gcheck\`
 
 **ReactionRoles**

 \`rradd\`, \`rrdel\`
 `)
  .setColor('9e1c36');
    
        message.channel.send(embed)
       
    }


}