const Discord = require("discord.js")
const random = (min, max) => Math.floor(Math.random() * (max - min) + min)

module.exports = {
    name:"sortear",
    aliases:[""],
    
    run: (client,message, args) => {
        if(message.author.id != '669297187938762782'){
            let embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setDescription(`Você não tem permissão para iniciar o sorteio pobre !!❌`);
            message.reply({ embeds: [embed] })
            return
        }

        if(args.length < 2 || args.length % 2 !=0){
            let embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setDescription(`Pessoas insuficientes para iniciar o sorteio!! 🛑`);
            message.reply({ embeds: [embed] })
        }
        else{
            let listPares = CriarPares(args, args.map((x) => x))
            console.log(listPares);
            EnviarMensagemSorteio(listPares,client)
            
            console.log(`Sorteio realizado pronto para outro: ${listUsers}`);

            let str = ""
            args.forEach(user => { str+=`@${user.name}, `})
            let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setDescription(`Sorteio realizado!! ✅\nCom os seguintes gays ${str} \n Estou pronto para outro sorteio 🎲`);
            message.reply({ embeds: [embed] })
        }

    }
}

function CriarPares(args, listSorteados) {
    let numSorteado
    let listPares = []

    args.forEach(user => {
        do {
            numSorteado = random(0,listSorteados.length)
            var presenteado = listSorteados[numSorteado]
        } while (presenteado.id == user.id);
    
        listPares.push({
            "presenteador":user,
            "presenteado":presenteado
        })
        listSorteados.splice(numSorteado,1)
        
    })

    return listPares
}

function EnviarMensagemSorteio(listPares, client) {
    listPares.forEach(par => {
        let id = par.presenteador.id
        let name = par.presenteado.name
        client.users.cache.get(id).send(`A pessoa que você ira presentear é ${name}. Mantenha em segredo 🤐`)
        
        console.log(`mensagem enviada para ${id}`);
    });
}

