module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log("Belépve mint " + bot.client.user.tag)
    }
}