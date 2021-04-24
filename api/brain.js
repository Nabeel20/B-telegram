const TelegramBot = require('node-telegram-bot-api');
const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new TelegramBot(token, { polling: true });

const TeleBot = require('telebot');
const tele_bot = new TeleBot('1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo');

module.exports = (req, res) => {
    try {
        const { body } = req;
        tele_bot.on(['/start', 'audio', 'sticker'], msg => {
            return bot.sendMessage(186274711, 'Bam!');
        });
        tele_bot.start();
    } catch (error) {

    }

}
