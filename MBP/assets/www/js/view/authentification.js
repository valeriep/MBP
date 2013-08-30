
function insererCodeAuthentification(){
	$('#contenuPageAuth').html(
			'<form id="loginForm">'+
				'<div data-role="fieldcontain" class="ui-hide-label">'+
				    '<label for="username">Username:</label>'+
				    '<input type="text" name="username" id="username" value="" placeholder="Username" />'+
			    '</div>'+
			    
		        '<div data-role="fieldcontain" class="ui-hide-label">'+
		            '<label for="password">Password:</label>'+
		            '<input type="password" name="password" id="password" value="" placeholder="Password" />'+
		        '</div>'+
		        
		     	'<a class="login" href = "#" data-role="button" data-transition="slidefade">'+
					'<input type="submit" value="Login" id="submitButton" />'+
				'</a>'+
	   	   '</form>'
		);
	
	var form = $("#loginForm");
	if(window.localStorage["usernameMBP"] != undefined && window.localStorage["passwordMBP"] != undefined) {
	   $("#username", form).val(window.localStorage["usernameMBP"]);
	   $("#password", form).val(window.localStorage["passwordMBP"]);
	}
}