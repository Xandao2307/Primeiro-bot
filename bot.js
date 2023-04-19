const Discord = require("discord.js");
const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] });
const config = require("./config.json");
const fs = require("fs");

let listUsers = []

client.login(config.secret)
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach(local => {
    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for(let file of comandos) {
        let puxar= require(`./commands/${local}/${file}`)

        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        } 
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
});

client.on("messageCreate", async (message) => {

    let prefix = config.prefix;
  
    if (message.author.bot) return;
    if (message.channel.type === Discord.ChannelType.DM) return;     
  
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    let cmd = args.shift().toLowerCase()
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
  try {
    switch (cmd) {
        case "entrar":
            var result = command.run(client, message, listUsers)
            if(result != undefined) {
                console.log(`${result.id} entrou no sorteio`);
                listUsers.push(result)
            }
            else console.log(`Pessoa repetida, não entrou no sorteio`);
            console.log(listUsers);
            break
        
            case "sortear":
            command.run(client,message,listUsers)
            listUsers = []
            break
        
            case "ping":
            command.run(client,message,args)
            break
        
            default:
            let cm = client.commands.get("default")
            cm.run(client,message,args)
            break
    }


  } catch (err) { 
     console.error('Erro:' + err); 
  }
});

client.on("ready", () => {
    console.log(`Estou online em ${client.user.username}!`)
})
