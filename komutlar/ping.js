const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const exampleEmbed = new Discord.MessageEmbed()
  .addField(`<:onay:810616787925860363>・Pingim` ,`${client.ws.ping}ms`)
  message.channel.send(exampleEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: '',
  usage: 'ping'
}; 