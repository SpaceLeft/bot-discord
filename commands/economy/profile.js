const Canvas = require("canvas");
const { registerFont } = require("canvas")
registerFont('./public/fonts/MyriadArabic-Regular.otf', { family: 'fountex' })
var ColorThief = require('color-thief');
var colorThief = new ColorThief();
const config = require("../../config.json")
const Discord = require("discord.js")
const { Database } = require("quickmongo");
const db1 = new Database(config.database);
const db = require("quick.db")
module.exports = {
    name: "profile",
    cooldown: 15,
    run: async (client, message, args) => {
const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author 
if(user === message.author.bot) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`Bots don't have a profile`))
let bal = await db1.get(`coins.${user.id}`)
if(!bal) bal = 0;
let level = await db1.get(`levell_${message.author.id}`) || await db1.set(`levell_${message.author.id}`, 1)
let exp = await db1.get(`exp_${user.id}`);
let every = db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
let rank = every.map(x => x.ID).indexOf(`xp_${user.id}`) + 1;
let rep = await db1.get(`REPs.${user.id}`)
if(!rep) rep = 0;
const canvas = Canvas.createCanvas(512, 512)
const ctx = canvas.getContext('2d')
var title = db.fetch(`title_${user.id}`, title)
if(title === "None") title = ""
if(title === null) title = ""
var bg = await db1.fetch(`background_${user.id}`);
if(bg == null) bg = "https://cdn.discordapp.com/attachments/790583025036820520/802833314091499540/valex113150600023.jpg"
const background = await Canvas.loadImage(bg)
const info = await Canvas.loadImage("https://cdn.discordapp.com/attachments/806425473809645578/806575377601921084/Untitl-2.png")
const avatar = await Canvas.loadImage(user.avatarURL({ format: 'jpg' }));


let username = user.username
if(username.length > 6) username = username.substr(0,6) +"..."
let fontSize = 50;
let fontSize2 = 90;
/*var width = 2.8
if(username.length < 6) width = 2.4
if(username.length < 4) width = 2.2*/
ctx.font = `${fontSize -= 10}px fountex`;
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.drawImage(info, 0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#1a1a1a';
ctx.fillText(rep, canvas.width / 1.338, canvas.height / 1.6);
ctx.fillText(rank, canvas.width / 1.3, canvas.height / 1.08);
ctx.fillText(level, canvas.width / 1.35, canvas.height / 2.16);
ctx.fillText(bal, canvas.width / 1.338, canvas.height / 1.28);
ctx.font = `${fontSize2 -= 10}px fountex`;
ctx.fillText(username, canvas.width / 2, canvas.height / 4.5);
ctx.arc(170, 80, 65, 0, Math.PI * 2, true);
ctx.clip();
ctx.drawImage(avatar, 105, 15, 130, 130);


      
      const att = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png')
      message.channel.send(att)
      

   }}