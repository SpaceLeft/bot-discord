const Discord = require('discord.js');


module.exports = {
        name: 'roles',
        description: 'Shows the server roles',
    run: async (client, message, args) => {
    let m = ""
    let ros = message.guild.roles.cache.size ;
for (let i = 0; i < ros; i++) {
          m += `${message.guild.roles.cache
            .filter(r => r.position == ros - i)
            .map(r => r)} ${message.guild.roles.cache
            .filter(r => r.position == ros - i)
            .map(r => `- Members: ${r.members.size}`)}\n`;
        }
const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
const description = m;
 let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setColor("#9e1c36")
    .setTitle(`Total roles \`${message.guild.roles.cache.size}\``)
     const splitDescription = splitMessage(description, {
      maxLength: 2000,
      char: "\n",
      prepend: "",
      append: ""
    });
splitDescription.forEach(async (m) => {
embed.setDescription(m);
message.channel.send(embed);
});
    }
}

