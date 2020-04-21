const telegram = require('telegraf');
const axios = require('axios');

const bot = new telegram('1022964771:AAFvHSn_hiiOau23cOQH9oxv7MXr7Q97K58');

bot.command('test', (ctx) => {
   bot.telegram.sendMessage(ctx.chat.id, 'hi', {
      reply_markup: {
         inline_keyboard: [
            // trigger an entire inline key board.
            [{ text: 'Click me! nigga!', callback_data: 'one' }],
         ],
      },
   });
});

bot.action('one', (ctx) => {
   ctx.answerCbQuery('ok u replied.'); // forremoving the loading icon // ' diusf' is a pop up query!
   ctx.reply('You Clicked the button'); // for actually replying a query
});

bot.launch();
