const Discord = require("discord.js")
const config = require("../../config.json")
const { Database } = require("quickmongo")
const db = new Database(config.database)
module.exports = {  
name:"alias",
permissions: 'ADMINISTRATOR',
run: async (client, message, args, prefix) =>{
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`${prefix}alias (add/remove)`));
  if(args[0] && (args[0].toLowerCase() == "add")){ 
const command = client.commands.get(args[1]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[1]));
if(!command)return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("**I can't find this command**"));
if(!args[2])return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**Please give me aliase for \`${command.help.name}\`**`));
let ai = {
alias: args[2],
command: command.name
}
    
await db.push(`aliases.${message.guild.id}`, ai)
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**${args[2]}** has been added to command: **${command.name}**`));
} else 
if(args[0] && (args[0].toLowerCase() == "remove")){ 
if(!args[1])return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`**Please give me aliase to delete**`));
let database = await db.get(`aliases.${message.guild.id}`)
if(database) {
  let data = database.find(x => x.alias === args[1].toLowerCase())
let unabletofind = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`Unable to find that alias on database.`)
.setColor("9e1c36")
  if(!data) return message.channel.send(unabletofind)
  let value = database.indexOf(data)
  delete database[value]
  var filter = database.filter(x => {
    return x != null && x != ''
  })
  await db.set(`aliases.${message.guild.id}`, filter)
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription(`You have removed: **${args[1]}**`));

} else { 
  return;
}

}
}};