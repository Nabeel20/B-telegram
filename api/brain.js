//const TelegramBot = require('node-telegram-bot-api');
const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
//const bot = new TelegramBot(token, { polling: true });
const TeleBot = require('telebot');
const tele_bot = new TeleBot({
    token,
    webhook: {
        url: 'b-t-b-6t5c0mbxi-nabeel20.vercel.app/api/brain', // HTTPS url to send updates to.
    },
});
tele_bot.start();

tele_bot.on('text', (msg) => msg.reply.text(msg.text))
module.exports = (req, res) => {
    try {
        console.log('0.4');
    } catch (error) {
        console.log('g')
    }
}
