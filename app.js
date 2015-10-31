var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mandrill = require('node-mandrill')('V-5kfmFg9OrL5TRDDEKifA');
var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req,res)
{	
	res.sendFile(__dirname + '/public/view/index.html');
});

app.get('/signup', function(req,res){
	res.sendFile(__dirname + '/public/view/signup.html');
});

//After module achive the required data from controllers in Serhan's App
app.post('/regisMail', function(request,response){
    
    console.log('response: ' + request.body.info);
    var deserializedInfo = JSON.parse(request.body.info);
    
	mandrill('/messages/send', {
        message: {
            to: [{email:'karabeykaan@gmail.com', name:'Kaan BlackMr' }],
            from_email: 'kaaninmuthissitesi@beypazari.com',
            subject: "Wassup Madafaka",
            text: 'Siteme hosgeldin yarraam'
        }
    }, function(error, response)
    {
        //uh oh, there was an error
        if (error) console.log( JSON.stringify(error) );

        //everything's good, lets see what mandrill said
        else console.log(response);
    });
});


server.listen(process.env.PORT || 8080);
console.log('Listening on MagicPort 8080');