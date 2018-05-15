var tmi = require('tmi.js');
//var request = require('request');

const userChannel = process.env.CHANNEL;

var ans;

var options = {
	options: {
		debug: true
	},
	connection: {
		//port: process.env.PORT || 80,
		cluster: "aws",
		reconnect: true
	},
	identity: {
		username: "susiaibot",
		password: process.env.OAUTH_TOKEN
	},
	channels: [userChannel]
};

// Connecting to IRC
var client = new tmi.client(options);
client.connect();

client.on('chat', function(channel, userstate, message, self){
	client.action(userChannel, message);
});

client.on('connected', function(address, port){
	console.log(`Address: ${address}, Port: ${port}`);
	client.action(userChannel, "Hi I'm SUSI.");
});








/*
client.on('chat', function(channel, userstate, message, self) {
	// setting options to make a successful call to SUSI API
	var options1 = {
		method: 'GET',
		url: 'http://api.susi.ai/susi/chat.json',
		qs:
		{
			timezoneOffset: '-300',
			q: message
		}
	};

	request(options1, function(error, response, body) {
		if (error) throw new Error(error);
		ans = (JSON.parse(body)).answers[0].actions[0].expression;
		client.action(userChannel, ans);
	})
	//console.log(ans);
});

client.on('connected', function(address, port) {
	client.action(userChannel, "Welcome, I'm SUSI.");
});*/
