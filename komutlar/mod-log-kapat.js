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
  
    db.delete(`modlog_${message.guild.id}`)
       const codamey3 = new Discord.MessageEmbed()
    .setDescription(`✔Başarılı Bir Şekilde Modlog Kapatıldı✔`)
    .setTimestamp()
    return message.channel.send(codamey3)
  
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'modlog-kapat'
}; 