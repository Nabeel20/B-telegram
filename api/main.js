const TeleBot = require('telebot');
const bot = new TeleBot('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');
module.exports = (req, res) => {
    const { body } = req;
    const { chat: { id }, text } = body.message;
    bot.sendMessage(chat.id, text)
    bot.start();
}