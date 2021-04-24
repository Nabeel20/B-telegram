const TeleBot = require('telebot');
const bot = new TeleBot('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');
module.exports = (req, res) => {
    const { body } = req;
    const { chat: { id }, text } = body.message;
    bot.on('/start', () => {
        return bot.sendMessage('186274711', `Bam! \n ${JSON.stringify(body)}`);
    });
    bot.start();
}