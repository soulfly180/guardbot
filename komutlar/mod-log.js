const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
  const codamey = new Discord.MessageEmbed()  
    .setColor('BLUE')
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Bu komutu kullanabilmek için **Yönetici** Yetkisine Sahip Olmalısın!`)
if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(codamey)    
let prefix = ayarlar.prefix  
let k = message.mentions.channels.first()
  if (!k) {
    const kanalbelirt = new Discord.MessageEmbed()
    .setDescription(`Kanal Belirt `)
    .setTimestamp()
    return message.channel.send(kanalbelirt)
  }
    db.set(`modlog_${message.guild.id}`,k.id)
       const güncellendi = new Discord.MessageEmbed()
    .setDescription(`Modlog Kanalı ${k} Olara Güncellendi`)
    .setTimestamp()
    return message.channel.send(güncellendi)
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'modlog'
}; 
