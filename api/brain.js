const TeleBot = require('telebot');
const bot = new TeleBot('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');
module.exports = (req, res) => {
    const { body } = req;
    const { chat: { id }, text } = body.message;
    console.log(message)
    bot.sendMessage('186274711', JSON.stringify(body))
    bot.start();
}