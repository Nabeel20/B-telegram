const TeleBot = require('telebot');
module.exports = (req, res) => {
    const { body } = req;
    const { chat: { id }, text } = body.message;
    const bot = new TeleBot('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');
    bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome  !!'));
    bot.start();
    response.send('OK');
}