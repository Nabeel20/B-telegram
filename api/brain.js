const TeleBot = require('telebot');
const bot = new TeleBot('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');

module.exports = (req, res) => {
    try {
        const { body } = req;
        const { chat: { id }, text } = body.message;
        bot.on(['/start', '/hello'], () => {
            bot.sendMessage('186274711', JSON.stringify(body));
            bot.sendMessage('186274711', 'Welcome')
            bot.sendMessage('186274711', text)
        });
        bot.start();
    } catch (error) {

    }

    res.send('OK');
}