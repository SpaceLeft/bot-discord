const Discord = require("discord.js");
let prefix = "+"
const db = require("quick.db");
 const language = "en";
module.exports = {
    name: "help",
    cooldown: 5,
    run: async (client, message, args) => {

  
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
    .setTitle("Helpful Links")
  
    .setDescription(` **[Add To Your Server](https://discord.com/oauth2/authorize?client_id=756951234916909056&permissions=8&scope=bot)**

                      **[Dash bord](https://protection-plus.xyz/)** 

                      **[Support server](https://discord.gg/ytNU3cE)** 

Use \`+commands\` to show the bot commands
`)
    .setColor('9e1c36');
       try {
        message.author.send(embed)
        message.react("✅")
         } catch (error) { 
          message.react("❌")
    }}

}

