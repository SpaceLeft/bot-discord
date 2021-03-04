const Discord = require("discord.js")
const db = require("quick.db")
let prefix = "+"
let words = [{
  word: "منشن شخص لاتضايقت تلقى نفسك عنده.",
},
{
word: "منشن شخص يوم تسولف معه تنسى هموم الدنيا ",
},
             {
word: "اكثر مكان تحب تروح له ف الويكند ؟",
},
             {
word: "كم وجبه تآكل ف اليوم ؟",
},
             {
word: "كم ساعه تنام ف اليوم ؟",
},
             {
word: "هل وثقت ف احد و خذلك ؟",
},
             {
word: "منشن شخص فاهمك ف كل شيء ",
},
             {
word: "كلمه معينه م يفهمها الا اصحابك ؟",
},
             {
word: "كلمه تعبر عن شعورك ؟",
},
             {
word: "هل برأيك أن عبارة `محد لأحد` صحيحه ام تعقتد عكس ذلك؟",
},
             {
word: "عبر عن مزاجك الحالي بإيموجي ؟",
},
             {
word: "شيء تنتظره بفارغ الصبر؟",
},
{
word: "لو بتغير اسمك ايش بيكون الجديد ؟",
},
             {
word: "اكثر مكان تكتب فيه  وتفضفض ؟",
},
             {
word: "تحب تكون علاقتك مع الناس ميانه ولا رسميه ؟",
},
             {
word: "صباح الخير واحبك تقولها لمين ؟",
},
             {
word: "تفرح من قلبك لما؟",
},
             {
word: "كلمات ماتستغني عنها بسوالفك؟",
},
             {
word: "عبر عن مودك الحالي بأموجي ؟",
},
             {
word: "ما هو التخصص اللي تحلم تدخله بالجامعة",
},
{
word: "اكثر شخص تتصل عليه؟",
},
{
word: "أهملك شخص غالي تعاتبه ولا ؟",
},
{
word: "منشن شخص لما تشوفه تبتسم ؟",
},
{
word: "تشوف انو التواصل  يومي من اساسيات الحب ؟",
},
{
word: "أشخاص تحبون سواليفهم ؟",
},
{
word: "موقف محرج ماتنساه ؟",
},
{
word: "الحب اختيار ولا قدٓر؟",
},
{
word: "جمله او مقوله تؤمن بها ؟",
},
{
word: "اوصف السعادة في كلمتين؟",
},
{
word: "ثلاثة أشياء تُحبها في نفسك؟",
},
{
word: "هل تؤيد الزواج التقليدي اما عن حب ؟",
},
{
word: "هل انت مستعد للتضحيه من اجل من تحب ؟",
},
{
word: "من طلاسم لهجتكم ؟",
},
             
             
             
    
]
module.exports = {
    name: "kt",
    aliases: ['كت'],
    run: async (client, message) => {  
      

   
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command == "كت") {
    let c = words[Math.floor(Math.random() * words.length)];

let embed = new Discord.MessageEmbed()
.setTitle("كت تويت | ✨")
.setColor('9e1c36')
.setDescription(`**${c.word}**`)
    message.channel.send(embed)
  }}}