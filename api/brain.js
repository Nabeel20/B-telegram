const { Telegraf } = require('telegraf');
const { json } = require('micro');

const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new Telegraf(token, { telegram: { webhookReply: false } });

bot.command('hello', (ctx) => ctx.reply('Hello, friend!'));
bot.start((ctx) => ctx.reply(JSON.stringify(ctx, null, 2)));

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

function handel_text_input(input_text) {
    let names = ['Nabeel', 'Najwa', 'Adnan'];
    if (names.includes(input_text)) return 'Welcome! Family ;)'
    return 'Welcome - not family'
}