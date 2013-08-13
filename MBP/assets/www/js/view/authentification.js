
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
			
	     	   '<input type="submit" value="Login" id="submitButton" />'+
	   	   '</form>'
		);
	
	var form = $("#loginForm");
	if(window.localStorage["usernameMBP"] != undefined && window.localStorage["passwordMBP"] != undefined) {
	   $("#username", form).val(window.localStorage["usernameMBP"]);
	   $("#password", form).val(window.localStorage["passwordMBP"]);
	}
	$("#loginForm").submit(function() {
     //disable the button so we can't resubmit while we wait
     $("#submitButton",this).attr("disabled","disabled");
	 var u = $("#username", this).val();
	 var p = $("#password", this).val();
	 if(u != '' && p!= '') {
		 authentifierUser(u, p);
	 }
	 return false;

	});
}

// Cette methode permet d'afficher le code supplementaire d'un user authentifier  
function afficherCodeFonctionnaliteUserAuthentifie() {
	// Remplacer le dernier lien du footer "Authentification" par "Mes Pistes"
	$('a.lienAuthentification').replaceWith('<a href = "#" class="lienMesPistes ui-btn-active" data-role="button" data-transition="slidefade">Mes Pistes</a>');
	
	afficherMesPistes();
}