const Discord = require('discord.js')
const quick = require('quick.db')
exports.run = async(client, message, args) => {  
if(!message.member.permissions.has('ADMINISTRATOR'))
  if (!args[0])
  {
  let hata = new Discord.MessageEmbed()
.setDescription('**Hatalı Kullanım Örnek ・ RolKoruma aç ・ kapat**')
.setColor('BLUE')
message.channel.send(hata)
  }
  if (args[0] === 'aç') {
    quick.set(`rolkoruma_${message.guild.id}`, "Aktif")
  let aç = new Discord.MessageEmbed()
.setDescription('**Rol Koruma Sistemi Başarıyla Açıldı!**')
.setColor('BLUE')
message.channel.send(aç)
  }
   if (args[0] === 'kapat') {
    quick.delete(`rolkoruma_${message.guild.id}`)
  let kapat = new Discord.MessageEmbed()
.setDescription('**Rol Koruma Sistemi Başarıyla Kapatıldı!**')
.setColor('BLUE')
message.channel.send(kapat)
   }
};
exports.conf = {
  aliases: ['rolkoruma','RolKoruma'],
  permLevel: 0
};
exports.help = {
  name: 'rol-koruma'
}; 