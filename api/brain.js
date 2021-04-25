const { Telegraf } = require('telegraf');
const { json } = require('micro');

const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new Telegraf(token, { telegram: { webhookReply: false } });

bot.command('hello', (ctx) => ctx.reply('Hello, friend!'));
bot.start((ctx) => ctx.reply(`أهلاً ${ctx.chat.first_name}`));

bot.hears('دورات', ctx => {
    ctx.replyWithDocument(`https://t.me/Balsam_app/186`, [{
        caption: 'دورات المهارات السريرية - قسم الصدرية - السنة الثانية',
    }])
})
bot.hears('المخيخ', ctx => {
    ctx.replyWithDocument(`https://t.me/Balsam_app/184`, [{
        reply_to_message_id: ctx.chat.id
    }])
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
