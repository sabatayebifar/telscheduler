var dsConfig = require('../datasources.json');


module.exports = function(app) {

	var Sche = app.models.schedule;
	var channelOwner = app.models.channelOwner;
	
	var TelegramBot = require('node-telegram-bot-api');  //use node-telegram-bot-api
	// var testconstant = new Constants();
	var token = '245169198:AAGZ5_iBf7Y_ZLnEBEMP7RSyNPpdIThGPvM'; //set token
	
	var bot = new TelegramBot(token, {polling: true});	// Setup polling way


	bot.onText(/\/start/ , function(msg){
		var messageText = 'سلام خوش اومدی! ای دی کانالت رو وارد کن تا برنامه زمانبندی تبلیغاتت رو وارد کنی';
		if(msg.chat.username == 'True_alpha' ||msg.chat.username == 'true_alpha'  )
			messageText = 'سلام محمود ! هنوز کار نمی کنه ها!'
		
		bot.sendMessage(msg.chat.id,messageText );
		
		if(!(msg.chat.username == 'True_alpha') ||!(msg.chat.username == 'true_alpha'  ))
			setTimeout(function(){bot.sendMessage(msg.chat.id,'لطفا اولش @ بزار' )}, 300) ;
	
	});

	bot.onText(/@(.+)/, function(msg){
		console.log(msg);
		var cho = new channelOwner();
		bot.sendMessage(msg.chat.id, 'خب باید وایسی تا پشتیبان تایید کنه تو ادمین این کانال هستی!');
		cho.channelName = msg.text.replace('@' , '');
		cho.username = msg.chat.username;
		var testfind = channelOwner.find( {where:{username: 'Sabatayebifar'}})
		.then(function(result){
			console.log(result);
			return result
		});

	});

	
	bot.onText(/model(.+)/ , function(msg){
		// var options = {
		  // reply_markup: JSON.stringify({keyboard: [{text :'/yebardige'}]})
		// };
		// bot.sendMessage(msg.chat.id,msg.message_id+' '+msg.text, options);
		var opts = {
		  reply_markup: JSON.stringify(
			{
			  
			  keyboard: [[{text :'/yebardige'}]]
			}
		  )};
		  
		bot.sendMessage(msg.chat.id, 'How old are you?', opts)
		  .then(function (sended) {
			var chatId = sended.chat.id;
			var messageId = sended.message_id;
			console.log(' hello from sended');
			console.log(sended);
			console.log('--------------------');
			console.log(chatId);
			bot.onReplyToMessage(chatId, messageId, function (message) {
			  console.log('User is %s years old', message.text);
			});
		  }); 
	});

	// var photo = __dirname + '\\ext.png';

}