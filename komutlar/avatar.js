const Discord = require("discord.js")

exports.run = async(client, message, args) => {
    let avatar2 =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.author;


const avatar = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle(`${avatar2.tag}`)
.setDescription(`[PNG](${avatar2.avatarURL({format:"png"})}) => [GIF](${avatar2.avatarURL({format:"gif"})}) => [JPG](${avatar2.avatarURL({format:"jpg"})})`)
.setImage(avatar2.avatarURL({ format: "png", dynamic:true ,size: 2048 })) 
.setFooter(`${message.author.tag}`) 
.setTimestamp()
 message.channel.send(avatar)

}
exports.conf = {
  enabled: true,
  guildOnly: true, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: '',
  usage: ''
};