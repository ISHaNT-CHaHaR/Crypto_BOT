const telegram = require('telegraf');
const axios = require('axios');

const bot = new telegram('1022964771:AAFvHSn_hiiOau23cOQH9oxv7MXr7Q97K58');

const apikey =
   'c8cedfd5c1783e7d10794d53a2a772095dceae005f48798e93a5ef44e30a8763';

bot.command('start', (ctx) => {
   sendStartMessage(ctx);
});

bot.action('start', (ctx) => {
   ctx.deleteMessage();
   sendStartMessage(ctx);
});

function sendStartMessage(ctx) {
   let message = `HI, I am gonna give you crypto currency information`;

   bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
         inline_keyboard: [
            [{ text: 'Crypto Prices', callback_data: 'price' }],
            [{ text: 'coinMarketCap', url: 'https://coinmarketcap.com/' }],
            [{ text: 'INFO.', callback_data: 'info' }],
         ],
      },
   });
}

bot.action('price', (ctx) => {
   let priceMessage = `Get price INFO.\nSelect one of the cryptocurrencies below`;
   ctx.deleteMessage();
   bot.telegram.sendMessage(ctx.chat.id, priceMessage, {
      reply_markup: {
         inline_keyboard: [
            [
               { text: 'BTC', callback_data: 'price-BTC' },
               { text: 'ETH', callback_data: 'price-ETH' },
            ],
            [
               { text: 'BCH', callback_data: 'price-BCH' },
               { text: 'LTC', callback_data: 'price-LTC' },
            ],
            [{ text: 'Back To MainMenu', callback_data: 'start' }],
         ],
      },
   });
});

var priceActionList = ['price-BTC', 'price-ETH', 'price-BCH', 'price-LTC'];
bot.action(priceActionList, async (ctx) => {
   // https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR

   try {
      let symbol = ctx.match.split('-')[1];
      console.log(symbol);
      let res = await axios.get(
         `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=c8cedfd5c1783e7d10794d53a2a772095dceae005f48798e93a5ef44e30a8763`
      );

      let data = res.data.DISPLAY[symbol].USD;

      let message = `
      Symbol: ${symbol}
      Price: ${data.PRICE}
      Open: ${data.OPENDAY}
      High: ${data.HIGHDAY}
      Low: ${data.SUPPLY}
      MarketCap: ${data.MKTCAP}`;
      ctx.deleteMessage();
      bot.telegram.sendMessage(ctx.chat.id, message, {
         reply_markup: {
            inline_keyboard: [
               [{ text: 'Back to prices', callback_data: 'price' }],
            ],
         },
      });
   } catch (err) {
      console.log(err);
      ctx.reply('Error Encountered!');
   }
});

bot.action('info', (ctx) => {
   ctx.answerCbQuery();
   bot.telegram.sendMessage(ctx.chat.id, 'Bot info', {
      reply_markup: {
         keyboard: [[{ text: 'Credits' }, { text: 'API' }]],
         resize_keyboard: true,
         one_time_keyboard: true,
      },
   });
});

bot.hears('Credits', (ctx) => {
   ctx.reply(' This piece of art made by Ishant ');
});

bot.hears('API', (ctx) => {
   ctx.reply(
      'This Bot uses cryptocompare API.\nhttps://min-api.cryptocompare.com/'
   );
});

// bot.command('test', (ctx) => {
//    bot.telegram.sendMessage(ctx.chat.id, 'MAIN MENU', {
//       reply_markup: {
//          inline_keyboard: [
//             // trigger an entire inline key board.
//             [{ text: 'See fruits  list', callback_data: 'fruits' }],
//             [{ text: 'See Vagetables list', callback_data: 'Vegetables' }],
//          ],
//       },
//    });
// });

// // bot.action('fruits', (ctx) => {
// //    ctx.answerCbQuery('ok u replied.'); // forremoving the loading icon // ' diusf' is a pop up query!
// //    ctx.reply('You Clicked the button'); // for actually replying a query
// // });
// bot.action('fruits', (ctx) => {
//    ctx.deleteMessage();
//    bot.telegram.sendMessage(ctx.chat.id, 'LIST:\n-Apples\n-Oranges\n-Pears', {
//       reply_markup: {
//          inline_keyboard: [
//             // trigger an entire inline key board.
//             [{ text: 'Back to Menu', callback_data: 'menu' }],
//          ],
//       },
//    });
// });

// bot.action('menu', (ctx) => {
//    ctx.deleteMessage();
//    bot.telegram.sendMessage(ctx.chat.id, 'MAIN MENU', {
//       reply_markup: {
//          inline_keyboard: [
//             // trigger an entire inline key board.
//             [{ text: 'See fruits  list', callback_data: 'fruits' }],
//             [{ text: 'See Vagetables list', callback_data: 'Vegetables' }],
//          ],
//       },
//    });
// });

bot.launch();
