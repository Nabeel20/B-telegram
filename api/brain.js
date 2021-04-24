const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const { Telegraf } = require('telegraf');
const bot = new Telegraf(token);
bot.launch();


module.exports = (req, res) => {
    const { body } = req;

    bot.start((ctx) => ctx.reply('Welcome'));
    bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    bot.hears('body', ctx => ctx.reply(`body is: ${JSON.stringify(body)}`))
    res.status(200).send(`Bot is alive!`)
}