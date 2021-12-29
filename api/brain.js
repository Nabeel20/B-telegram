const { Telegraf } = require('telegraf');
const { json } = require('micro');
const fetch = require('node-fetch');
const token = process.env.Bot_token;
const bot = new Telegraf(token, { telegram: { webhookReply: false } });
const { readFileSync } = require('fs')
const { join } = require('path')


async function fetch_database() {
    async function get_sheets() {
        let sheetId = '1R8vXFIZ32PUK3M2zHYuJnXCyZh7Nbg0BWKsBCPz9dY0';
        let sheetNumber = 1;
        try {
            const sheetsUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${sheetNumber}/public/values?alt=json-in-script`;
            let fetched = await fetch(sheetsUrl);
            if (fetched.ok == false) {
                console.log("there is an error in the gsheets response");
                throw new Error("Error fetching GSheet");
            }
            let fetched_text = await fetched.text();
            const formatted_text = fetched_text
                .replace("gdata.io.handleScriptLoaded(", "")
                .slice(0, -2);
            console.log(JSON.parse(formatted_text))
            return JSON.parse(formatted_text);
        } catch (err) {
            throw new Error(`General error when fetching GSheet: ${err}`);
        }
    }
    function handle_sheets(json_response) {
        const data = json_response.feed.entry;
        const startRow = 2; // skip the header row(1), don't need it

        let processedResults = [{}];
        let colNames = {};

        for (let item of data) {
            const cell = item['gs$cell']; // gets cell data
            const val = cell['$t']; // gets cell value
            const columnNum = cell['col']; // gets the col number
            const thisRow = cell['row']; // gets the row number

            const colNameToAdd = colNames[columnNum]; // careful, this will be undefined if we hit it on the first pass

            // don't add this row to the return data, but add it to list of column names
            if (thisRow < startRow) {
                colNames[columnNum] = val;
                continue; // skip the header row
            }

            if (typeof processedResults[thisRow] === 'undefined') {
                processedResults[thisRow] = {};
            }

            if (typeof colNameToAdd !== 'undefined' && colNameToAdd.length > 0) {
                processedResults[thisRow][colNameToAdd] = val;
            }
        }

        // make sure we're only returning valid, filled data items
        processedResults = processedResults.filter(
            result => Object.keys(result).length
        );
        return processedResults
    }
    let data = await get_sheets();
    let output = handle_sheets(data);
    return output
}

bot.start(async (ctx) => {
    ctx.replyWithChatAction('typing');
    await ctx.reply(`أهلاً ${ctx.chat.first_name}`);
    await ctx.reply('أرسل اسم الاختبار أو الدورة من فضلك 😃');
    //   await ctx.telegram.sendMessage('@nabeel_analytics', `ID: ${ctx.chat.id} \n User name: ${ctx.chat.username}`);
});
bot.command('balsam', (ctx) => ctx.reply(`قناتنا على التلغرام @Balsam_app`));
bot.hears('شكراً', ctx => ctx.reply('أهلاً وسهلاً 😌'));
// bot.on('text', async (ctx) => {
//     let msg = ctx.message.text;
//     if (msg.length > 3) {
//         if (msg.trim() == 'دورات' || msg.trim() == 'دورة') {
//             ctx.replyWithChatAction('typing');
//             await ctx.reply(`${msg} ماذا؟ 🔍🤔`);
//         } else {
//             await ctx.replyWithChatAction('typing');
//             const sheets = await fetch_database();
//             let files = sheets.filter(quiz => quiz.name.includes(msg.trim()));
//             if (files.length > 0) {
//                 for (let i = 0; i < files.length; i++) {
//                     let quiz = files[i];
//                     ctx.replyWithChatAction("typing");
//                     let caption = quiz.caption.split('-');
//                     await ctx.reply(`${caption[0]}    ${caption[1]} 📖 ${caption[2]} 🚩`);
//                     ctx.replyWithChatAction("upload_document");
//                     await ctx.replyWithDocument(quiz.path);
//                 }
//             } else {
//                 ctx.replyWithChatAction("typing");
//                 await ctx.reply("عذراً لم أتمكن من إيجاد الملف ☹️🤔");
//             }
//         }
//     } else {
//         ctx.replyWithChatAction('typing');
//         await ctx.reply('3 حروف فقط؟ متأكد 🤔');
//     }
// })
// bot.hears('file', ctx => {
//     try {
//         const data = readFileSync(join(__dirname, '_files', 'test.txt'), 'utf8')
//         ctx.reply(data)
//     } catch (err) {
//         ctx.reply(err)
//     }
// })
module.exports = async function (req, res) {
    try {
        const body = await json(req)
        await bot.handleUpdate(body)
        res.statusCode = 200
        res.end('')
    } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/html')
        res.end('<h1>Server Error</h1><p>عذراً، حدثت مشكلة</p>')
    }
};
