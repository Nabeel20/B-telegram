const { Telegraf } = require('telegraf');

const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new Telegraf(token, { telegram: { webhookReply: false } });

bot.command('hello', (ctx) => ctx.reply('Hello, friend!'));
const { json } = require('micro');

module.exports = async function (req, res) {
    try {
        const body = await json(req)
        console.log(body)
        bot.handleUpdate(body)
        res.statusCode = 200
        res.end('')
    } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/html')
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>')
        console.error(e.message)
    }
};

