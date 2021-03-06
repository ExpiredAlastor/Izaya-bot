const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client, 
    prefix: "~",
    owners: ["605731202833580042"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()
client.buttons = new Discord.Collection()

client.loadEvents = (bot, reload) => require(`./handlers/events`)(bot, reload)
client.loadCommands = (bot, reload) => require(`./handlers/commands`)(bot, reload)
client.loadSlashCommands = (bot, reload) => require(`./handlers/slashcommands`)(bot, reload)
client.loadButtons = (bot, reload) => require(`./handlers/buttons`)(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)


module.exports = bot

client.on("ready", () => {
    console.log(`Belépve mint ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "Szia"){
        message.reply("Hello :>")
    }
})

client.on("messageCreate", (message) => {
    if (message.content == "Ügyes vagy Izaya"){
        message.reply("Köszönöm szépen")
    }
})

const welcomeChannelId = "968593831756967996"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Üdvözlünk a szerveren!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)