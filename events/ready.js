const config = require("../config.json")
const { Database } = require("quickmongo");
const db = new Database(config.database);
   
   module.exports = async (client) =>{
   client.user.setPresence({ activity: { name: `+help | ${client.guilds.cache.size} servers`, type: "PLAYING" }, status: "dnd" });
  await client.guilds.cache.forEach(async g =>{
    var Vch = await db.fetch(`Vonline_${g.id}`) 
    if(Vch){
      var Channel = await g.channels.cache.get(Vch.channel)
      if(Channel){
        setInterval(async()=>{
       Vch = await db.fetch(`Vonline_${g.id}`) 
        var Von =  g.members.cache.filter(m => m.voice.channel)
          if(Channel){
            var name = Vch.name.replace(`[00]`,`${Von.size}`)
            Channel.setName(`${name} [ ${Von.size} ]`)
          }
        },1000*60*5)
      }
    }
  })
}