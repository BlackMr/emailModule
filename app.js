var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req,res)
{	
	res.sendFile(__dirname + '/public/view/index.html');
});

app.get('/signup', function(req,res){
	res.sendFile(__dirname + '/public/view/signup.html');
});



server.listen(process.env.PORT || 8080);
console.log('Listening on MagicPort 8080');