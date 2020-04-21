const telegram = require('telegraf');
const axios = require('axios');

const bot = new telegram('1022964771:AAFvHSn_hiiOau23cOQH9oxv7MXr7Q97K58');

bot.command('test', (ctx) => {
   bot.telegram.sendMessage(ctx.chat.id, 'MAIN MENU', {
      reply_markup: {
         inline_keyboard: [
            // trigger an entire inline key board.
            [{ text: 'See fruits  list', callback_data: 'fruits' }],
            [{ text: 'See Vagetables list', callback_data: 'Vegetables' }],
         ],
      },
   });
});

// bot.action('fruits', (ctx) => {
//    ctx.answerCbQuery('ok u replied.'); // forremoving the loading icon // ' diusf' is a pop up query!
//    ctx.reply('You Clicked the button'); // for actually replying a query
// });
bot.action('fruits', (ctx) => {
   ctx.deleteMessage();
   bot.telegram.sendMessage(ctx.chat.id, 'LIST:\n-Apples\n-Oranges\n-Pears', {
      reply_markup: {
         inline_keyboard: [
            // trigger an entire inline key board.
            [{ text: 'Back to Menu', callback_data: 'menu' }],
         ],
      },
   });
});

bot.action('menu', (ctx) => {
   ctx.deleteMessage();
   bot.telegram.sendMessage(ctx.chat.id, 'MAIN MENU', {
      reply_markup: {
         inline_keyboard: [
            // trigger an entire inline key board.
            [{ text: 'See fruits  list', callback_data: 'fruits' }],
            [{ text: 'See Vagetables list', callback_data: 'Vegetables' }],
         ],
      },
   });
});

bot.launch();
