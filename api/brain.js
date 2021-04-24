const TeleBot = require('telebot');
//const bot = new TeleBot('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');
const { Telegraf } = require('telegraf')
const bot = new Telegraf('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');

module.exports = (req, res) => {
    try {
        const { body } = req;
        // bot.on(['/start', '/hello'], () => {
        //     bot.sendMessage('186274711', JSON.stringify(body));
        //     bot.sendMessage('186274711', 'Welcome')
        //     bot.sendMessage('186274711', text)
        // });
        res.send(JSON.stringify(body));

    } catch (error) {

    }

}
bot.start((ctx) => ctx.reply('Welcome'))
bot.launch()