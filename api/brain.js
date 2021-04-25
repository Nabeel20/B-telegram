const { Telegraf } = require('telegraf');
const { json } = require('micro');

const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new Telegraf(token, { telegram: { webhookReply: false } });

bot.start((ctx) => ctx.reply(`أهلاً ${ctx.chat.first_name}`));
bot.on('text', async (ctx) => {
    let msg = ctx.update.message;
    if (msg == 'المخيخ') {
        await bot.telegram.sendMessage(ctx.chat.id, 'بنك التشريح- ملفات بلسم - السنة الثانية');
        await bot.telegram.sendDocument(ctx.chat.id, 'https://t.me/Balsam_app/184')
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
