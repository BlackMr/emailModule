var express = require('express');
var path = require('path'); 
var app = express();
var server = require('http').createServer(app);
var mandrill = require('node-mandrill')('V-5kfmFg9OrL5TRDDEKifA');
var bodyParser= require('body-parser');
//var Router=require('router');
//var router=express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.set('view', path.join(__dirname, 'view'));


app.get('/', function (req,res)
{	
	res.sendFile(__dirname + '/public/view/index.html');
	console.log('Hello "/"');

});

app.get('/signup', function (request, response) { 
	//var togo = JSON.parse(request.body.information);
	//app.post('/signup', function (req,res){

		console.log('sign up');
		response.sendFile( __dirname + '/public/view/signup.html');
 	//});
});



app.get('/confMail', function(req,res){
	res.sendFile(__dirname + '/public/view/signUpMailTemp.html');
});

//After module achive the required data from controllers in Serhan's App
app.post('/regisMail', function(request,response){
    
    
    var deserializedForm = JSON.parse(request.body.info);
    console.log('deserializedForm',deserializedForm);
	

	mandrill('/messages/send-template', {
        	template_name:"confirmationEmail",
        	template_content: [ 
        	{
        		name:"confirmationEmail",
        		content:"confirmation Email",
        	}],

            message: {
            	to: [{email:deserializedForm[2].value, name:deserializedForm[0,1].value }],
            	from_email: 'oldstager@mail.com',
            	subject: "Confirmation for GYMGYM",
            	text: 'Siteme hosgeldin yarraam',

             	auto_text: true,
        		inline_css: true,
        		merge: true,
        		merge_language: "handlebars",
 				tags: [ 'signupToPage' ],
       
        		global_merge_vars: [
        			{	
        				name: "emaill",
        				content: deserializedForm[2].value,
        			},
        			{
        				name:"nameof",
								content:deserializedForm[0].value
					},
					{
						name:"surnameof",
						content:deserializedForm[1].value
						
					}
    			],
    			merge_vars: [
    				{
    					vars: [
							{

								name:"emaill",
								content:deserializedForm[2].value
							}
    					]
    				}
    			]
    		}
  		
    }, function(error, response)
    {
        //uh oh, there was an error
        if (error) console.log( JSON.stringify(error) );

        //everything's good, lets see what mandrill said
        else console.log(response);
    });
	
	response.sendFile(__dirname + 'public/view/signUpMailTemp');
});


server.listen(process.env.PORT || 8080);
console.log('Listening on MagicPort 8080');