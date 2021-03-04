const { registerFont } = require('canvas'); 
registerFont('./public/fonts/fount.ttf', { family: 'fount1' })
const Discord = require("discord.js")
const db = require("quick.db")
let prefix = "+"
let words = [{
  word: "بحبك",
answer: ["بحبك"]
},
{
word: "يعمري",
answer: ["يعمري"]
},

{
word: "السعودية",
answer: ["السعودية"]
},
           {
word: "القسطنطينية",
answer: ["القسطنطينية"]
},
           {
word: "امازون",
answer: ["امازون"]
},
           {
word: "متجر",
answer: ["متجر"]
},
           {
word: "هواوي",
answer: ["هواوي"]
},
           {
word: "مايكروسوفت",
answer: ["مايكروسوفت"]
},
           {
word: "ابل",
answer: ["ابل"]
},
           {
word: "باندا",
answer: ["باندا"]
},
           {
word: "الأرض",
answer: ["الأرض"]
},
           {
word: "شورما",
answer: ["شورما"]
},
{
word: "تكأكأتم",
answer: ["تكأكأتم"]
},
           {
word: "سماء",
answer: ["سماء"]
},
           {
word: "جملة مفيدة",
answer: ["جملة مفيدة"]
},
           {
word: "فونيكا فنو",
answer: ["فونيكا فنو"]
},
           {
word: "يوسف",
answer: ["يوسف"]
},
           {
word: "خالد",
answer: ["خالد"]
},
           {
word: "مدرسة",
answer: ["مدرسة"]
},
           {
word: "ارض",
answer: ["ارض"]
},
           {
word: "انا جميل",
answer: ["انا جميل"]
},
           {
word: "الأوسكار",
answer: ["الأوسكار"]
},
           {
word: "ايفون",
answer: ["ايفون"]
},
             {
  word: "الحوت الازرق",
  answer: ["الحوت الازرق"]
},
           
]
const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');
  let fontSize = 160;
  do {
    ctx.font = `${fontSize -= 10}px fount1`;
  } while (ctx.measureText(text).width > canvas.width - 300);
  return ctx.font;
};
const Canvas = require("canvas")
var cooldownGames = new Set();
module.exports = {
    name: "fast",
    aliases: ['اسرع'],
    run: async (client, message) => {  
      


      
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command == "اسرع") {
    if (cooldownGames.has(message.author.id)) {
      message.reply(new Discord.MessageEmbed().setDescription('هنالك سؤال لم يتم الاجابة عليه')  .setColor("9e1c36"));
      return
    }
    cooldownGames.add(message.author.id);
    const canvas = Canvas.createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');
    let c = words[Math.floor(Math.random() * words.length)];

    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/709542752995770418/780165414881460295/asr3.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#36393f';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = applyText(canvas, c.word);
    ctx.fillStyle = '#74273a';
    ctx.fillText(c.word, canvas.width / 2.5, canvas.height / 1.9);

    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'fast.png');
const filter = response => {
	return c.answer.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};

    message.channel.send(attachment).then(() => {
	message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] }).then((collected) =>{
          message.channel.send(new Discord.MessageEmbed().setDescription(`** جيد لقد حصلت على نقطة \n${collected.first().author} :tada:**`).setColor("9e1c36"))
          db.add(`potins_${message.guild.id}_${message.author.id}`, 1)
          cooldownGames.delete(message.author.id);
          
        

      }).catch(collected => {
        message.channel.send(new Discord.MessageEmbed().setDescription("**انتها الوقت و لم يتم كتابة الكلمة بشكل صحيح**").setColor("9e1c36"));
 cooldownGames.delete(message.author.id)
      });
    })
  }}}