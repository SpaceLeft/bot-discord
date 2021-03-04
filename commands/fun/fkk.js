const { registerFont } = require('canvas'); 
registerFont('./public/fonts/fount.ttf', { family: 'fount1' })
const Discord = require("discord.js")
const db = require("quick.db")
let prefix = "+"
let words = [{
  word: "بحبك",
answer: ["ب ح ب ك"]
},
{
word: "يعمري",
answer: ["ي ع م ر ي"]
},

{
word: "السعودية",
answer: ["ا ل س ع و د ي ة"]
},
           {
word: "القسطنطينية",
answer: ["ا ل ق س ط ن ط ي ن ي ة"]
},
           {
word: "امازون",
answer: ["ا م ا ز و ن"]
},
           {
word: "متجر",
answer: ["م ت ج ر"]
},
           {
word: "هواوي",
answer: ["ه و ا و ي"]
},
           {
word: "مايكروسوفت",
answer: ["م ا ي ك ر و س و ف ت"]
},
           {
word: "ابل",
answer: ["ا ب ل"]
},
           {
word: "باندا",
answer: ["ب ا ن د ا"]
},
           {
word: "الأرض",
answer: ["ا ل أ ر ض"]
},
           {
word: "شورما",
answer: ["شورما"]
},
{
word: "تكأكأتم",
answer: ["ت ك أ ك أ ت م"]
},
           {
word: "سماء",
answer: ["س م ا ء"]
},
           {
word: "جملة مفيدة",
answer: ["ج م ل ة م ف ي د ة"]
},
           {
word: "فونيكا فنو",
answer: ["ف و ن ي ك ا ف ن و"]
},
           {
word: "يوسف",
answer: ["ي و س ف"]
},
           {
word: "خالد",
answer: ["خ ا ل د"]
},
           {
word: "مدرسة",
answer: ["م د ر س ة"]
},
           {
word: "ارض",
answer: ["ا ر ض"]
},
           {
word: "انا جميل",
answer: ["ا ن ا ج م ي ل"]
},
           {
word: "الأوسكار",
answer: ["ا ل أ و س ك ا ر"]
},
           {
word: "ايفون",
answer: ["ا ي ف و ن"]
},
             {
  word: "الحوت الازرق",
  answer: ["ا ل ح و ت ا ل ا ز ر ق"]
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
    name: "fkk",
    aliases: ['فكك'],
    run: async (client, message) => {  



      
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command == "فكك") {
    if (cooldownGames.has(message.author.id)) {
      message.reply(new Discord.MessageEmbed().setDescription('هنالك سؤال لم يتم الاجابة عليه')  .setColor("9e1c36"));
      return
    }
    cooldownGames.add(message.author.id);
    const canvas = Canvas.createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');
    let c = words[Math.floor(Math.random() * words.length)];

    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/709542752995770418/780335087882993694/fkk.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#36393f';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = applyText(canvas, c.word);
    ctx.fillStyle = '#74273a';
    ctx.fillText(c.word, canvas.width / 2.6, canvas.height / 1.9);

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