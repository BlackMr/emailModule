$(document).ready(function(){
	console.log('Click the button to Sign Up!');
	


	
	//button for sign Up and redirecting "signup.html"
	$('#signUp').click(function(){
		console.log('"Sign Up Now" button clicked');
		window.location.replace("http://localhost:8080/signup");
		//window.location.href = "http://stackoverflow.com";
	});

	//return home page 
	$('#returnHome').click(function(){
		console.log('Redirected to HOME');
		window.location.replace("http://localhost:8080/");
		//window.location.href = "http://stackoverflow.com";
	});

	//All form data will send for processes in serhan's App
	$('#signUpForm').on('submit', function(event){
		
		event.preventDefault();
		var signUpForm = $(this);
		var formReady = JSON.stringify(signUpForm.serializeArray());
		console.log(formReady[1].surName);
		console.log("Mail Will be send in a few minutes! " + formReady );
	

		$.ajax({
		type: 'POST', 
		url:'/regisMail', 
		data: { info: formReady },
		dataType:'json'
		 });
	});

});

