const translate = require("@k3rn31p4nic/google-translate-api")
const Discord = require("discord.js");
module.exports = {
        name: "short",
        cooldown: 5,
    run: async (message, args) => {  
  let lang = args[0]
  let language = args[1]
  let text = args.slice(2).join(" ")
  if(!lang) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("Please give me the first lang").setColor("9e1c36"))
  if(!language) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("Please give me the secund lang").setColor("9e1c36"))
  if(language.length !== 2) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("language name most be two words only").setColor("9e1c36"))
  if(!text) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription("Please give me somethink to translate").setColor("9e1c36"))
  const title = await translate(text, { from: lang, to: language })
  
  let lange = lang
  if(lang === "ar") lange = "Arabic"
  if(lang === "en") lange = "Englist"
  if(lang === "ru") lange = "Russian"
  if(lang === "fr") lange = "French"

    let lange2 = language
  if(language === "ar") lange2 = "Arabic"
  if(language === "en") lange2 = "Englist"
  if(language === "ru") lange2 = "Russian"
  if(language === "fr") lange2 = "French"
  
  
  let embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
  .setTitle("Google translater")
  .setDescription(`**${lange} : \n \`${text}\` \n ${lange2} : \n\`${title.text}\`**`)
  .setThumbnail(`https://cdn.discordapp.com/attachments/751151838308466752/795659482721550386/Untitled-1.png`)
  .setColor("9e1c36")
  message.channel.send(embed)  
}}
