const TelegramBot = require('node-telegram-bot-api');
const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new TelegramBot(token, { polling: true });
// const TeleBot = require('telebot');
// const tele_bot = new TeleBot({
//     token,
//     polling: { // Optional. Use polling.
//         interval: 1000, // Optional. How often check updates (in ms).
//         timeout: 0, // Optional. Update polling timeout (0 - short polling).
//         limit: 100, // Optional. Limits the number of updates to be retrieved.
//         retryTimeout: 2500, // Optional. Reconnecting timeout (in ms).
//         proxy: 'http://username:password@yourproxy.com:8080' // Optional. An HTTP proxy to be used.
//     },
//});
//tele_bot.start();
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});
module.exports = (req, res) => {
    try {
        console.log('0.5');
    } catch (error) {
        console.log('g')
    }
}
