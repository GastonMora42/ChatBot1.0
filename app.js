require("dotenv").config();

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//ChatGPT//
const ChatGPTClass = require("./chatgpt.class")
// //
//Flows
//const flowTuto = require("./flows/flowAsesor")


    const createBotGPT = async ({ provider, database }) => {
        return new ChatGPTClass(database, provider);
    };


const main = async () => {
    const adapterDB = new MockAdapter()
    //const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBotGPT({
        //flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
