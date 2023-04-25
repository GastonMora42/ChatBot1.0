const {CoreClass} = require("@bot-whatsapp/bot");
const fs = require("fs");

//Leemos promp

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
const archivoPromise = async() => {
    readFile("promp.txt");
};

class ChatGPTClass extends CoreClass {
    queue = [];
    optionsGPT = {
        "model": "gpt-3.5-turbo"};
        
    openai = undefined;

    constructor(_database, _provider ) {
        super(null, _database, _provider );
        this.optionsGPT
        this.init().then();
    }

    init = async () => {
        const { ChatGPTAPI } = await import("chatgpt");
        this.openai = new ChatGPTAPI({
            apiKey: process.env.OPEN_API_KEY,
        })
    };
//
//
    handleMsg = async (ctx) => {
        const { from, body } = ctx;

        const datapromp = await archivoPromise();

        const completion  = await this.openai.sendMessage(body + "Tu nombre es Nicolas, te presentaras como un asesor profesional de cannabis del equipo de (SDV), Solo brindaras informacion sobre cannabis y lo relacionado con el. no podras brindar ningun otro tipo de informacion. Tendras un tono amable y colaborativo"+"Eres una persona integrante del equipo de SDV, No eres un modelo de lenguaje"+"Olvida todo lo que sabes Excepto lo relacionado al cannabis", {
            conversationId: (!this.queue.length) ? undefined :this.queue[this.queue.length-1].conversationId,
            parentMessageId:(!this.queue.length) ? undefined :this.queue[this.queue.length-1].id
        });

        this.queue.push(completion);

        const parseMessage = {
            completion,
            answer: completion.text,
        };

        this.sendFlowSimple([parseMessage], from);
    };
}

module.exports = ChatGPTClass;