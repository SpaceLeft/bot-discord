
const Discord = require("discord.js");
const db = require("quick.db");
let prefix = "+"
module.exports = {
    name: "fakebot",
    aliases: ['fk'],
    description: "send message as a fake bot",
    run: async (client, message, args) => {
 
 if (["@everyone", "@here"].includes(args[0].toLowerCase())) return message.reply("If the owner shows this message he will fuck you"); message.delete().catch(()=>{});
if(message.author.bot || !message.guild || !message.content.startsWith(prefix))return;
let user = message.guild.member(message.mentions.users.first() || message.author);
if(!args[0] || (user.id !== message.author.id && !args.slice(1).join(" "))){
  let embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setDescription("Usage: +fakebot [member] <message>")
        .setColor("9e1c36");
return message.channel.send(embed)
}
message.channel.createWebhook( user.nickname ? user.nickname : user.user.username, { avatar: user.user.avatarURL()}).then(async hook=>{
await message.delete({timeout: 100}).catch(()=> {  });
await hook.send(user.id !== message.author.id ? args.slice(1).join(" ") : args.join(" "));
await hook.delete();
}).catch(()=> {});
}}

