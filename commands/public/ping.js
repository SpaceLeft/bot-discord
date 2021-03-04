const Discord = require("discord.js");
const language = "en"
const db = require("quick.db")
/////كود سرعة البوت او البينق
module.exports = {
    name: "ping",
    description: "show bot ping",
  guildOnly: true,
    run: async (client, message, args) => {
      
            
      
      if (!message.channel.guild) return;
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    var ping = `${Math.round(client.ws.ping)}`;

    const E1ping = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setDescription(` \`\`\`BOT Ping Is : ${ping} \`\`\` `)
      .setColor("9e1c36");
    message.channel.send(E1ping);
  }
}
