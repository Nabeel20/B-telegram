const TelegramBot = require('node-telegram-bot-api');
const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new TelegramBot(token, { polling: true });
module.exports = (req, res) => {
    try {
        const { body } = req;
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;

            // send a message to the chat acknowledging receipt of their message
            bot.sendMessage(186274711, 'Received your message');
        });
    } catch (error) {

    }

}
