const config = require("../config.json");
const { Database } = require("quickmongo");
const db = new Database(config.database);
const Discord = require("discord.js")
const Autorole = require("../models/autorole.js")

module.exports = async (client, member) => {
db.add(`newmembers_${member.guild.id}`, 1)
  
  Autorole.findOne({
    guildID: member.guild.id
}, async (err, autorole) => {
    if (autorole === null) return;
  if(autorole.toggle === 'off') return;  

if (!member.guild.roles.cache.find(r => r.id === `${autorole.autorole}`)) return;
    member.roles.add(autorole.autorole, `Autorole`);
  })

  
  
  
  
}