const { Telegraf } = require('telegraf');
const { json } = require('micro');
const reader = require("g-sheets-api");

const token = process.env.Bot_token;
const bot = new Telegraf(token, { telegram: { webhookReply: false } });

function get_database() {
    let output = []
    reader({
        sheetId: "1R8vXFIZ32PUK3M2zHYuJnXCyZh7Nbg0BWKsBCPz9dY0",
    }, (results) => {
        output = results
    });
    return output;
}

bot.start((ctx) => ctx.reply(`أهلاً ${ctx.chat.first_name}`));
bot.command('balsam', (ctx) => ctx.reply(`قناتنا على التلغرام @Balsam_app`))

bot.on('text', async (ctx) => {
    let msg = ctx.message.text;
    let database_output = get_database().filter(quiz => quiz.name.includes(msg.trim()))

    if (database_output.length > 0) {
        for (let index = 0; index < database_output.length; index++) {
            const quiz = database_output[index];
            await ctx.reply(quiz.caption);
            await ctx.reply(quiz.path);
        }
    } else {
        await ctx.reply('عذراً لم أجد الملف الذي تبحث عنه');
        await ctx.reply('ربما يمكنك البحث عنه على قناتنا على التلغرام @Balsam_app')
    }
})

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
