const config = require("../../config.json")
const Discord = require("discord.js")
const { Database } = require("quickmongo");
const db = new Database(config.database);
module.exports = {
    name: "background-remove",
    cooldown: 10,
    run: async (client, message, args) => {
        
         db.delete(`background_${message.author.id}`)
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setColor("9e1c36").setDescription("profile img has been reset."))
        }}