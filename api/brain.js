const TeleBot = require('telebot');

module.exports = (req, res) => {
    try {
        const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
        const bot = new TeleBot({
            token,
            usePlugins: ['askUser']
        });
        const { body } = req;

        bot.on('text', (msg) => msg.reply.text(msg.text));
        bot.start();
    } catch (error) {

    }
    res.send('ok')
}