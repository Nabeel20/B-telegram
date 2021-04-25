const { Telegraf } = require('telegraf');
const app = require('express')()

const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new Telegraf(token);

bot.command('hello', (ctx) => ctx.reply('Hello, friend!'))

bot.telegram.setWebhook(
    `https://${process.env.VERCEL_URL}/api/brain`
)

app.get('/api', async (req, res) => {
    try {
        await bot.handleUpdate(req.body);
    } finally {
        res.status(200).end()
    }
})

module.exports = app