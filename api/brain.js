const token = '1785552676:AAFICB4xRoNHcK0Ve-lbXCbSePtfwwsanfo';
const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('Welcome'));
bot.launch();