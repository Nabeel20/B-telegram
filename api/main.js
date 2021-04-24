const TeleBot = require('telebot');
const bot = new TeleBot(process.env.Bot_token);
module.exports = (req, res) => {
    // const { body } = req;
    // const { chat: { id }, text } = body.message;
    bot.on('text', (msg) => msg.reply.text(msg.text));
    bot.start();
}