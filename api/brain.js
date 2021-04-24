const TeleBot = require('telebot');
//const bot = new TeleBot('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');
const bot = new Telegraf('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');

module.exports = (req, res) => {
    try {
        const { body } = req;
        // bot.on(['/start', '/hello'], () => {
        //     bot.sendMessage('186274711', JSON.stringify(body));
        //     bot.sendMessage('186274711', 'Welcome')
        //     bot.sendMessage('186274711', text)
        // });
        bot.hears('hi', () => bot.sendMessage('186274711', JSON.stringify(body)))
        bot.hears('nabeel', () => bot.sendMessage('', 'welcome nabeel'))
        bot.launch()
        bot.start();
    } catch (error) {

    }

    res.send('OK');
}