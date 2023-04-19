const Discord = require("discord.js")
module.exports = {
    name: "default", // Coloque o nome do seu comando
    aliases: [""], // Coloque sinônimos do nome do comando

    run: async(client, message, args) => {
        let embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setImage('https://cdn.discordapp.com/attachments/856279534872559629/1056683008205279242/Screenshot_20220721-211924_WhatsApp.jpg')
        .setTimestamp()
        
        .setDescription(`Que comando é esse mano ${message.author} ?`);
        
        message.reply({ embeds: [embed] })
    }
}