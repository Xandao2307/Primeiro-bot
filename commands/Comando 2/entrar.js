const Discord = require("discord.js");

module.exports = {
    name: "entrar",
    aliases: [""],

    run: (client,message, args) => {
            if (VerificarUsuarioRepetidoNaLista(args, message.author.username)) {
                let embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setDescription(`Olá ${message.author}, você entrou no sorteio !!✅`);
                message.reply({ embeds: [embed] })
                let user = { "name":message.author.username ,"id":message.author.id}
                return user
            } 
            else{
                let embed = new Discord.EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setDescription(`Ei ${message.author}, você já entrou no sorteio!! ❌`);
                message.reply({ embeds: [embed] })
            }            
    }
    
}

function VerificarUsuarioRepetidoNaLista(listUsers, newUser) {
    let test = true
    if(listUsers == undefined || listUsers.length < 1) test = true

    if(newUser == undefined || newUser == null) test = false
    
    listUsers.forEach(user => { if (user.name == newUser) test = false })

    return test
}