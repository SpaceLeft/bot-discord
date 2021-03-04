const mongoose = require("mongoose");
const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
var fs = require("fs")
const Welcomer = require("./models/welcomer.js");
const Autorole = require("./models/autorole.js");
const Log = require("./models/log.js");
const Logs = require("./models/logs.js");
const bodyParser = require("body-parser");
const config = require("./config.json")
const app = express();
const MemoryStore = require("memorystore")(session);
const Discord = require("discord.js");
const client = new Discord.Client();
const { Database } = require("quickmongo");
const db = require("quick.db")
const db1 = new Database(config.database);
const listener = app.listen(process.env.PORT, () => { console.log("Your app is listening on port " + listener.address().port); });
db1.on("ready", () => { console.log("quickmongo Database connected!") });
mongoose.connect(config.database2 ,{ useNewUrlParser: true, useUnifiedTopology: true });




client.commands = new Discord.Collection();
const Categories = ["ticket", "moderation", "badwords", "public", "owner", "fun", "giveaway", "protection", "economy", "rolereaction"];

Categories.forEach(async function(Category, message) {
fs.readdir(`./commands/${Category}`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${Category}/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command | Category : ${Category} | Command : ${commandName}`);
    client.commands.set(commandName, props);
  })
});
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});


client.on('message', (message) => {
    if (message.guild) {
        let words = db.get(`anitbadwords_${message.guild.id}`);
        if (words === null) return;
        
        if (words && words.find((find) => find.swearword == message.content.toLowerCase())) {
            console.log(words);
            message.delete();
            message.reply(`The word you said is blocked in this server.`).then((msg) => {
                msg.delete({
                    timeout: 5000,
                });
            });
        }
    }
});





const { GiveawaysManager } = require("discord-giveaways");
if (!db.get("giveaways")) db.set("giveaways", []);
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  async getAllGiveaways() {
    return db.get("giveaways");
  }
  async saveGiveaway(messageID, giveawayData) {
    db.push("giveaways", giveawayData);
    return true;
  }
  async editGiveaway(messageID, giveawayData) {
    const giveaways = db.get("giveaways");
    const newGiveawaysArray = giveaways.filter(
      giveaway => giveaway.messageID !== messageID
    );
    newGiveawaysArray.push(giveawayData);
    db.set("giveaways", newGiveawaysArray);
    return true;
  }
  async deleteGiveaway(messageID) {
    const newGiveawaysArray = db
      .get("giveaways")
      .filter(giveaway => giveaway.messageID !== messageID);
    db.set("giveaways", newGiveawaysArray);
    return true;
  }
};
const manager = new GiveawayManagerWithOwnDatabase(client, {
  storage: false,
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    exemptPermissions: [],
    embedColor: "#9e1c36",
    reaction: "🎉"
  }
});
client.giveawaysManager = manager;

manager.on("giveawayReactionAdded", async (giveaway, member, reaction) => {
  if (member.user.bot) return;
  let message = reaction.message;
  let black = await db.get(`blacklist_${member.id}_${message.guild.id}`);
  if (black === true) {
    reaction.users.remove(member).catch(() => {});
  }
});



  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`); 
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`); 

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  
  passport.use(new Strategy({
	clientID: "803919676618833941",
	clientSecret: "uxntTUteCs3l4F6eN08Lr32HxbT_8ywN",
	callbackURL: 'https://protection-plus.xyz/auth',
	scope: ['identify', 'guilds', 'guilds.join']
  },
  (accessToken, refreshToken, profile, done) => { 
    process.nextTick(() => done(null, profile));
  }));

 
  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4ngg",
    resave: false,
    saveUninitialized: false,
  }));

 
app.use(passport.initialize());
app.use(passport.session());
app.locals.domain = 'https://protection-plus.xyz/';
app.use(express.static("public"));
const https = require('https');
app.set("view engine", "ejs");



  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };

  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL; 
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  app.get("/auth", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });

app.get("/support", (req,res) => {
  res.redirect("https://discord.gg/ytNU3cE")
})

app.get("/invite", (req,res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=803919676618833941&permissions=8&scope=bot`)
})




app.get('/', (req,res) => {
  const user = req.isAuthenticated() ? req.user : null;
  const botStats = [{
		botty: client,
		user: req.isAuthenticated() ? req.user : null
	}];

	
   res.render("index.ejs", {
      bot: botStats,
   user,
		client: client
	})
  
  })
app.get('/404', (req,res) => {
  const user = req.isAuthenticated() ? req.user : null;
  const botStats = [{
		botty: client,
		user: req.isAuthenticated() ? req.user : null
	}];

	
   res.render("404.ejs", {
     error: "Error"
	})
  
  })
app.get('/soon', (req,res) => {
  const user = req.isAuthenticated() ? req.user : null;
  const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];


        
          
res.render("soon", {
bot: botStats,
user,
client,
Discord
}) 
        
         
       
  });




app.get('/dashboard', checkAuth,async (req,res) => {
  const user = req.isAuthenticated() ? req.user : null;
  const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null


	}];
  let level = await db1.get(`levell_${user.id}`)
let rep = await db1.get(`REPs.${user.id}`)
if(!rep) rep = 0;
let bal = await db1.get(`coins.${user.id}`)
if(!bal) bal = 0;
let every = db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
let rank = every.map(x => x.ID).indexOf(`xp_${user.id}`) + 1;

          
           res.render("dashboard", {
  bot: botStats,
  user,
	client,
  Discord,
  bal,
  level,
  rep,
  rank
	}) 
        
         
       
  });


app.get('/commands',  (req,res) => {
  const user = req.isAuthenticated() ? req.user : null;
  const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];


        
          
           res.render("commands", {
bot: botStats,
user,
client,
Discord
	}) 
        
         
       
  });




app.get('/dashboard/:guildID',  checkAuth,async (req, res) => {
  const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];
	const guild = client.guilds.cache.get(req.params.guildID);
	if (!guild) return res.status(404);
	const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
	if (!isManaged && !req.session.isAdmin) res.redirect('/');
	const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
  let messages = await db1.fetch(`messages_${req.params.guildID}`)
  var newmembers = await db1.fetch(`newmembers_${req.params.guildID}`)
  var oldmembers = await db1.fetch(`oldmembers_${req.params.guildID}`)
	const user = req.isAuthenticated() ? req.user : null;
  if(newmembers === null) newmembers = "0"
  if(oldmembers === null) oldmembers = "0"
             res.render('server.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
    messages,
    bot: botStats,
    Discord,
    newmembers,
    oldmembers
 
     
         })
});




app.get('/dashboard/:guildID/suggestions',  checkAuth,async (req, res) => {
  const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];
	const guild = client.guilds.cache.get(req.params.guildID);
	if (!guild) return res.status(404);
	const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
	if (!isManaged && !req.session.isAdmin) res.redirect('/');
	const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
	const user = req.isAuthenticated() ? req.user : null;
  var onoff = await db1.get(`sugtoggle_${req.params.guildID}`)
  var suggestion = await db1.get(`sugchannel_${req.params.guildID}`)
  if(onoff === null) onoff = "off"
             res.render('suggestions.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
    bot: botStats,
    Discord,
    onoff,
    suggestion
 
     
         })
});
app.post("/suggestions", async(req, res) => {

var onoff = req.body.onoff;
  
var guild = req.body.guild;
  
var channelID = req.body.channelID;
  
if(!client.guilds.cache.get(guild)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
  
await db1.set(`sugtoggle_${guild}`, onoff)

await db1.set(`sugchannel_${guild}`, channelID)

console.log(`For ${guild} | Sug channel ${channelID} | toggle ${onoff}`)

res.redirect(`/dashboard/${guild}/suggestions`)
  
});





app.get('/dashboard/:guildID/voiceonline',  checkAuth,async (req, res) => {
  const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];
	const guild = client.guilds.cache.get(req.params.guildID);
	if (!guild) return res.status(404);
	const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
	if (!isManaged && !req.session.isAdmin) res.redirect('/');
	const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
	const user = req.isAuthenticated() ? req.user : null;
  const VoiceChannel = db.get(`Vonline_${req.params.guildID}`)
             res.render('voiceonline.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
    bot: botStats,
    Discord,
    VoiceChannel
 
     
         })
});
app.post("/voiceonline", async(req, res) => {


var guild = req.body.guild;
  
var Name = req.body.Name

var data = await db1.get(`Vonline_${guild}`)

var chanela = client.channels.cache.get(data)

if(chanela) return res.send(`/`) 

  
if(!client.guilds.cache.get(guild)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
  
const guilds = client.guilds.cache.find((g) => g.id === guild);


      var ronline = await guilds.members.cache.filter(m => m.voice.channel)
      var Vch = await db1.fetch(`Vonline_${guild}`)
        var channel;
        
          if(Vch && guilds.channels.cache.get(Vch.channel)){
            var NewName = Name.replace("[00]",ronline.size)
      
            channel = Vch.channel
            var NewVc = {
              channel: channel,
              name: Name
            }
            
                 await db1.set(`Vonline_${guild}`, NewVc)
            
            
            
          }else{
            let everyone = guilds.roles.cache.find(role => role.name === "@everyone");
            var ronline = await guilds.members.cache.filter(m => m.voice.channel)
          
            var NewName = Name.replace("[00]",ronline.size)
      
          channel = await guilds.channels.create(`${NewName} [ ${ronline.size} ]`,{type:"voice"})
          
                            channel.createOverwrite(everyone, {
                        CONNECT: false,
                      });
     
      var NewVc = {
        channel : channel.id,
        name : Name
      }
      
     await db1.set(`Vonline_${guild}`,NewVc)
    
    
     setInterval(async()=>{
       var voline = await guilds.members.cache.filter(m => m.voice.channel)
       var Vchh = await db1.fetch(`Vonline_${guild}`)
       var newName = Vchh.name.replace("[00]",voline.size)
       channel.setName(`${newName} [ ${voline.size} ]`)
     },1000*60*5)
          } 

  
console.log(`For`)

res.redirect(`/dashboard/${guild}/voiceonline`)
  
});








app.get('/dashboard/:guildID/log', checkAuth, (req, res) => {

	const guild = client.guilds.cache.get(req.params.guildID);
	if (!guild) return res.status(404);
	const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
	if (!isManaged && !req.session.isAdmin) res.redirect('/log');
	const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
	const user = req.isAuthenticated() ? req.user : null;
 const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];
  Log.findOne({
  guildID: guild.id
}, (err, log) => {


       if(log===null) {

              const newLog = new Log({
		  _id: mongoose.Types.ObjectId(),
		  guildID: guild.id,
      channel: "null",
      toggle: "on"
	  })
	  newLog.save()

             res.render('log.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
		client: client,
    bot: botStats,
    Discord,
    log
   
	});
      
            
             

       } else {
          res.render('log.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
		client: client,
    bot: botStats,
    Discord,
    log
   
	});
       }
     })
  })















app.get('/dashboard/:guildID/welcomer', checkAuth, (req, res) => {

	const guild = client.guilds.cache.get(req.params.guildID);
	if (!guild) return res.status(404);
	const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
	if (!isManaged && !req.session.isAdmin) res.redirect('/');
	const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
	const user = req.isAuthenticated() ? req.user : null;
  const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];
         Welcomer.findOne({
  guildID: guild.id
}, (err, welcomer) => {

       
       if(welcomer===null) {
              const newWelcomer = new Welcomer({
		  _id: mongoose.Types.ObjectId(),
		  guildID: guild.id,
      channel: "null"
	  })
	  newWelcomer.save()

             
             res.render('welcomer.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
    welcomer,
    bot: botStats,
    Discord
   
	});
      
       } else {
          res.render('welcomer.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
    welcomer,
    bot: botStats,
    Discord
   
	});
       }
     })
  })





app.get('/dashboard/:guildID/autorole', checkAuth, (req, res) => {

	const guild = client.guilds.cache.get(req.params.guildID);
	if (!guild) return res.status(404);
	const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
	if (!isManaged && !req.session.isAdmin) res.redirect('/');
	const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
	const user = req.isAuthenticated() ? req.user : null;
  const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];
     Autorole.findOne({
  guildID: guild.id
}, (err, autorole) => {
 
        if(autorole===null) {
          
              const newTickets = new Autorole({
		  _id: mongoose.Types.ObjectId(),
		  guildID: guild.id,
      toggle: "on",
      autorole: "null"
	  })
	  newTickets.save()
             
             res.render('autorole.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
    bot: botStats,
    Discord,
    autorole
   
	});
       } else {
          res.render('autorole.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
   
    bot: botStats,
     Discord,
          autorole   
	});
       }
     })
  })





app.post("/autorole", (req, res) => {
  
	var role = req.body.channelID; 
    
	
	var guild = req.body.guild;
    
          var onoff = req.body.onoff

	
	 if(!guild) return;
	
	if(!role) return res.send("Error, no role specified. <a href='/'>Back To Home Page</a>");
	
    if(!client.guilds.cache.get(guild).roles.cache.find(x => x.name === role)) return res.send("Error, no role specified. <a href='/'>Back To Home Page</a>");
   
   let roleid = client.guilds.cache.get(guild).roles.cache.find(x => x.name === role).id

   if(!client.guilds.cache.get(guild)) return res.send("Error, no guild specified. <a href='/'>Back To Home Page</a>");

   Autorole.findOne({
     guildID: guild,
   }, async (err, autorole) => {
    if (!autorole) {
        const newPro = new Autorole({
          _id: mongoose.Types.ObjectId(),
          guildID: guild,
          toggle: "on",
          autorole: "null",
         
        });
        newPro.save().catch(err => {
          console.log(err);
        });
        res.redirect(`/dashboard/${guild}/autorole`)
      } else {
      
   
autorole.autorole = roleid
        autorole.toggle = onoff
        autorole.save().catch(err=>console.log(err))

	
	
    console.log(`For ${guild}, role is ${role} with the id ${roleid}`)

	
     res.redirect(`/dashboard/${guild}/autorole`)
      }
   })
  })

app.post("/welcome", (req, res) => {
  
	var channel = req.body.channelID; 
	
  var message = req.body.message
    
	var guild = req.body.guild;
  
  var onoff = req.body.onoff
	
	 
	
	 if(!client.channels.cache.get(channel)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
   
	 if(!client.guilds.cache.get(guild)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
	
    if(!message) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");
	
	 Welcomer.findOne({
     guildID: guild,
}, (err, welcomer) => {
     
     if(!welcomer) {
	  const newWelcomer = new Welcomer({
		  _id: mongoose.Types.ObjectId(),
		  guildID: guild.id,
      channel: "null",
      message: "None",
      toggle: "on"
	  })
	  newWelcomer.save()
        res.redirect(`/dashboard/${guild}/welcomer`)
  } else {
  
	

	welcomer.channel = channel
    welcomer.message = message
    welcomer.toggle = onoff
	welcomer.save().catch(err=>console.log(err))
  
  console.log(`For ${guild}, welcome channel is: ${channel}, message is ${message}`)

	
   res.redirect(`/dashboard/${guild}/welcomer`)
  }
  })
});

app.post("/log", (req, res) => {
  
	var channel = req.body.channelID; 
	
   
    
	var guild = req.body.guild;
  
  var onoff = req.body.onoff
	
	 
	
	 if(!client.channels.cache.get(channel)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
   
	 if(!client.guilds.cache.get(guild)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
	
    
	
	 Log.findOne({
     guildID: guild,
}, (err, log) => {
     
     if(!log) {
	  const newWelcomer = new Log({
		  _id: mongoose.Types.ObjectId(),
		  guildID: guild,
      channel: "null",
      toggle: "on"
	  })
	  newWelcomer.save()
        res.redirect(`/dashboard/${guild}/log`)
  } else {
  
	

	log.channel = channel
    log.toggle = onoff
	log.save().catch(err=>console.log(err))
  
  console.log(`For ${guild}, log channel is: ${channel}, toggle is ${onoff}`)

	
   res.redirect(`/dashboard/${guild}/log`)
  }
  })
});



let webhooktoken = "zezo@1a2a3a"

app.post("/api/vote" , (req , res) =>{
   if(req.headers["authorization"] !== webhooktoken || req.headers["user-agent"] !== "DBL") return;
  let { bot , user , type , query , isWeekend } = req.body
  if(type !== "upvote") return res.send("not authorization");
  
    client.channels.cache.get('806425473809645578').send(`<@${user}> Is Vote The Bot`)
   res.send("ok")
})


app.get('/dashboard/:guildID/protection', checkAuth, async(req, res) => {
    const user = req.isAuthenticated() ? req.user : null;
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const guildFetch = guild;
    if(user.id === guildFetch.owner.id) {
    const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
    if (!isManaged && !req.session.isAdmin)    res.render("404.ejs", {error: "Error"})
    const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
  const botStats = [{client: client, user: req.isAuthenticated() ? req.user : null}];
  var banlimts = await db1.get(`banlimts_${req.params.guildID}`);
  var kicklimts = await db1.get(`kicklimts_${req.params.guildID}`);
  var rolecreate = await db1.get(`rolecreatelimt_${req.params.guildID}`);
  var roledelete = await db1.get(`roledeletelimts_${req.params.guildID}`);
  var channelcreatelimts = await db1.get(`channelcreatelimts_${req.params.guildID}`);
  var channeldeletelimts = await db1.get(`channeldeletelimts_${req.params.guildID}`);
  let logchannel = await db1.get(`acitonslogs_${req.body.guild}`);
  if(banlimts === null) banlimts = "0"
  if(kicklimts === null) kicklimts = "0"
  if(rolecreate === null) rolecreate = "0"
  if(roledelete === null) roledelete = "0"
  if(channelcreatelimts === null) channelcreatelimts = "0"
  if(channeldeletelimts === null) channeldeletelimts = "0"
             res.render('protection.ejs', {
        guild,
        user,
        client: client,
        fs: fs,
    bot: botStats,
    Discord,
    banlimts,
    kicklimts,
    rolecreate,
    roledelete,
    channelcreatelimts,
    channeldeletelimts,
    logchannel
             })
} else {
return res.redirect("/404")  }
})

app.post("/protection", async(req, res) => {
  
var channel = req.body.channelID; 

var banlimts = req.body.banlimts
  
var kicklimts = req.body.kicklimts

var rolecreate = req.body.rolecreate

var roledelete = req.body.roledelete

var channelcreatelimts = req.body.channelcreatelimts

var channeldeletelimts =  req.body.channeldeletelimts

var guild = req.body.guild;
  
var onoff = req.body.onoff

if(!client.guilds.cache.get(guild)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
  
if(!channel) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");

if(!banlimts) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");
  
if(!kicklimts) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");

if(!rolecreate) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");

if(!roledelete) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");

if(!channelcreatelimts) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");

if(!channeldeletelimts) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");
  
await db1.set(`banlimts_${req.body.guild}`, banlimts);
  
await db1.set(`kicklimts_${req.body.guild}`, kicklimts);
  
await db1.set(`rolecreatelimt_${req.body.guild}`, rolecreate);
  
await db1.set(`roledeletelimts_${req.body.guild}`, roledelete);
  
await db1.set(`channelcreatelimts_${req.body.guild}`, channelcreatelimts);
  
await db1.set(`channeldeletelimts_${req.body.guild}`, channeldeletelimts);
  
await db1.set(`acitonslogs_${req.body.guild}`, channel);
    
const Pchannel = await client.channels.cache.get(channel)

await Pchannel.send(new Discord.MessageEmbed().setColor("9e1c36").setDescription("**Done has been seup the protection log channel please give me the highest role to protection your server With the best quality**").setFooter("Note : you can set white list for the members that you don't want the protection work on them"))

console.log(`For ${guild} \n Ban limits : ${banlimts} \n Kick limits : ${kicklimts} \n Role create limits : ${rolecreate} \n Role delete limits : ${roledelete} \n Channel create limits : ${channelcreatelimts} \n Channel delete limits : ${channeldeletelimts} \n Protection channel : ${channel}`)

res.redirect(`/dashboard/${guild}/protection`)
  
});



app.get('/dashboard/:guildID/config', checkAuth, async(req, res) => {

	const guild = client.guilds.cache.get(req.params.guildID);
	if (!guild) return res.status(404);
	const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
	if (!isManaged && !req.session.isAdmin) res.redirect('/');
	const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
	const user = req.isAuthenticated() ? req.user : null;
  const botStats = [{ client: client, user: req.isAuthenticated() ? req.user : null}];
  var prefix = await db1.fetch(`prefix.${req.params.guildID}`)
  if(!prefix) prefix = "+"
  if(prefix === undefined) prefix = "+"
             
             res.render('config.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
    bot: botStats,
    Discord,
    prefix
   
	});
 
  })

app.post("/config", async(req, res) => {
  
	
var prefix = req.body.prefix

var guild = req.body.guild;
  
var onoff = req.body.onoff

   

if(!prefix) return res.send("Error, no message specified. <a href='/'>Back To Home Page</a>");
  

  
await db1.set(`prefix.${req.body.guild}`, prefix);
  

  
  
  
console.log(`For ${guild} \n prefix has been set to : ${prefix}`)

res.redirect(`/dashboard/${guild}/config`)
  
});




app.get('/dashboard/:guildID/logss', checkAuth, async(req, res) => {

	const guild = client.guilds.cache.get(req.params.guildID);
	if (!guild) return res.status(404);
	const isManaged = guild && Boolean(guild.member(req.user.id)) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
	if (!isManaged && !req.session.isAdmin) res.redirect('/logss');
	const groles = app.get(`https://discordapp.com/api/v6/guilds/${req.params.guildID}/roles`);
	const user = req.isAuthenticated() ? req.user : null;
 const botStats = [{
		client: client,
		user: req.isAuthenticated() ? req.user : null
	}];
  Logs.findOne({
  guildID: guild.id
}, (err, logs) => {


       if(logs===null) {

              const newLog = new Log({
		  _id: mongoose.Types.ObjectId(),
		  guildID: guild.id,
      channel: "null",
      toggle: "on"
	  })
	  newLog.save()

             res.render('logss.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
		client: client,
    bot: botStats,
    Discord,
    logs
   
	});
      
            
             

       } else {
          res.render('logss.ejs', {
		guild,
		user,
		client: client,
		fs: fs,
		client: client,
    bot: botStats,
    Discord,
    logs
   
	});
       }
     })
  })

app.post("/logs", (req, res) => {
  
	var channelCreate = req.body.channelCreate;  
    
	var guild = req.body.guild;
  
  var channelCreateOnOff = req.body.channelCreateOnOff
	
  var channelCreateColor = req.body.channelCreateColor
	 
  if(channelCreateColor === undefined) channelCreateColor = "#9e1c35"
	
	 if(!client.channels.cache.get(channelCreate)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
   
	 if(!client.guilds.cache.get(guild)) return res.send("Error, no channel specified. <a href='/'>Back To Home Page</a>");
	
    
	
	 Logs.findOne({
     guildID: guild,
}, (err, logs) => {
     
     if(!logs) {
	  const newLogs = new Log({
		  _id: mongoose.Types.ObjectId(),
		  guildID: guild,
      channelCreate: "null",
      channelCreatetoggle: "off",
      channelCreateColor: "#9e1c36"
	  })
	  newLogs.save()
        res.redirect(`/dashboard/${guild}/logss`)
  } else {
  
	
  logs.channelCreateColor = channelCreateColor
	logs.channel = channelCreate
  logs.toggle = channelCreateOnOff
	logs.save().catch(err=>console.log(err))
  
  console.log(`For ${guild}, ChannelCreate log is: ${channelCreate}, toggle is ${channelCreateOnOff}, color is ${channelCreateColor}`)

	
   res.redirect(`/dashboard/${guild}/logss`)
  }
  })
});


const invites = {}; // Codes

const wait = require("util").promisify(setTimeout);
client.on("ready", async () => {
  wait(1000);

  await client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
var gg2;
client.on("guildMemberAdd", async member => {
  Welcomer.findOne({
    guildID: member.guild.id
}, async (err, welcomer) => {
    if (welcomer === null) return;
  if(welcomer.toggle === 'off') return;  
 member.guild.fetchInvites().then(async guildInvites => {

    const gamer = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => gamer.get(i.code).uses < i.uses);
    const inviter = client.users.cache.get(invite.inviter.id) || member.guild.owner;
     db.add(`MemberInvites_${inviter.id}`, 1)
var invites = await db.fetch(`MemberInvites_${inviter.id}`)
if(invites === null) invites = "0"
if(!client.channels.cache.get(welcomer.channel)) return;
    
let user = welcomer.message.replace("[user]", member.user)

let space = user.replace("[userName]", member.user.username)

let g = space.replace("[server]", `**${member.guild.name}**`)

let inv = g.replace("[inviter]", inviter)

let inve = inv.replace("[inviterName]", inviter.username)

let invet = inve.replace("[invites]", `**${invites}**`)

let all = invet.replace("[members]", `**${member.guild.memberCount}**`)
 
client.channels.cache.get(welcomer.channel).send(all)

})

      })
  
})





client.on('message', async message => {
if(message.author.bot) return;
await db1.add(`messages_${message.guild.id}`, 1)
})



const prefix = "+"

/*
الكود اللي يزيد الكريدت و اكس بي بالتفاعل تحت
*/

client.on("message", async message =>{ 
if(message.author.bot) return; 
let on_or_off = await db.get(`blacklist_${message.author.id}`)
if(on_or_off == true) return;
 if(on_or_off === null) on_or_off = false;
  await db1.add(`coins.${message.author.id}`, 1) 
  await db1.add(`exp_${message.author.id}`, 1);
 let xp = await db1.get(`exp_${message.author.id}`);
 let needxp = await db1.get(`neededxp_${message.author.id}`) ||100;
  
 let level = Math.floor(0.2 * Math.sqrt(xp));
 let lvl = await db1.get(`levell_${message.author.id}`) || await db1.set(`levell_${message.author.id}`, 1)
 if (xp >= needxp) {
 let newLevel = await db1.add(`levell_${message.author.id}`, 1);
 let neweed = await db1.set(`neededxp_${message.author.id}`, Math.floor(needxp * 1.45));

  }})  


client.on("message", async message =>{
if(message.content.toLowerCase().split(" ")[0] === `${prefix}ashour1`){
let on_or_off = await db.get(`blacklist.${message.author.id}`); if(on_or_off === null) on_or_off = false; if(on_or_off === true) return message.reply("You're cannot use the economic system because you're blacklisted")
const member = message.mentions.users.first()  || message.author 
 let level = await db1.get(`levell_${message.author.id}`) || await db1.set(`levell_${message.author.id}`, 1)
let exp = await db1.get(`exp_${member.id}`);
 //let neededXP = Math.floor(Math.pow(level / 0.1, 2));
 let neededXP = await db1.get(`neededxp_${message.author.id}`) || 100;
  
  let every = db.all().filter(i => i.ID.startsWith("exp_")).sort((a, b) => b.data - a.data);
  let rank = every.map(x => x.ID).indexOf(`exp_${member.id}`) + 1;

let rep = await db1.get(`REPs.${member.id}`)
  if(rep === null) rep = 0;
  let bal = await db1.get(`coins.${member.id}`)
  if(bal === null) bal = 0;
    let lvlEmbed = new Discord.MessageEmbed()
.setColor("#00BFFF")
.setThumbnail(member.avatarURL({dynamic:true}))
.addField('Username:', ` ${member.username} \`(${member.id})\``)
.addField('Economy',` 
Reputation: \`${rep}\`
Coins: \`${bal}\`
Level: \`${level}\` | XP: \`${exp}/${neededXP}\`
Rank: ${rank}
`,true)
  .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL())
  .setTimestamp(); 
    
message.channel.send(lvlEmbed)
  }})
client.on("message", async message =>{
  if(!message.guild) return;
var onoff = await db1.get(`sugtoggle_${message.guild.id}`)
if(onoff === null) onoff = "off"
if(onoff === "off") return;
if(message.author.bot) return;
let channel = await db1.fetch(`sugchannel_${message.guild.id}`)
if( channel === null ) return;
if(message.channel.id !== channel) return;
await message.delete({ timeout: 1000 });
return message.channel.send(
new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(message.content)
.setColor("#9c1c34"))
.then( msg => {
msg.react("<:14:814379979064213504>")
msg.react("<:13:814379327516442664>")
})
})
  client.on('messageReactionRemove', async (reaction, user) => {
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  let emote = await db1.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.id}`)
  if(!emote) return;
  let messageid = await db1.get(`message_${reaction.message.guild.id}_${reaction.emoji.id}`)
  if(!messageid) return;
  let role = await db1.get(`role_${reaction.message.guild.id}_${reaction.emoji.id}`)
  if(!role) return;
   if(reaction.message.id == messageid && reaction.emoji.id == `${emote}`) {
    reaction.message.guild.members.fetch(user).then(member => {

   let embed = new Discord.MessageEmbed()
   .setAuthor(user.username , user.displayAvatarURL())
   .setDescription(`**${reaction.message.guild.roles.cache.get(role).name}** Role Removed From You!`)

   
   .setColor("9e1c36")
   user.send(embed)
   member.roles.remove(role)
    
  })
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  let emote = await db1.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.name}`)
  if(!emote) return;
  let messageid = await db1.get(`message_${reaction.message.guild.id}_${reaction.emoji.name}`)
  if(!messageid) return;
  let role = await db1.get(`role_${reaction.message.guild.id}_${reaction.emoji.name}`)
  if(!role) return;
   if(reaction.message.id == messageid && reaction.emoji.name == `${emote}`) {
    reaction.message.guild.members.fetch(user).then(member => {
    
   let embed = new Discord.MessageEmbed()
   .setAuthor(user.username , user.displayAvatarURL())
   .setDescription(`**${reaction.message.guild.roles.cache.get(role).name}** Role Removed From You!`)

   
   .setColor("9e1c36")
   user.send(embed)
   member.roles.remove(role)
    
  })
  }
})




client.login(config.TOKEN) 

