import { Telegraf } from 'telegraf';
const bot = new Telegraf('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');

module.exports = (req, res) => {
    const { body } = req;
    const { chat: { id }, text } = body.message;
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    bot.start();
}