
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
			
	     	   //'<input type="submit" value="Login" id="submitButton" />'+
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
	
	/*
	$("#loginForm").submit(function() {
     //disable the button so we can't resubmit while we wait
     $("#submitButton",this).attr("disabled","disabled");
	 var u = $("#username", this).val();
	 var p = $("#password", this).val();
	 if(u != '' && p!= '') {
		 authentifierUser(u, p);
		// On attend que la fonction authentifierUser a fini son travail,
		// et a mis true ou false dans la variable authentified
		 setTimeout(function(){
			if(authentified == "false")
				navigator.notification.alert("Your login failed", function() {});
		 },3000);
	 }
	 return false;
	});
	*/
}

// Cette methode permet d'afficher le code supplementaire d'un user authentifier  
function afficherCodeFonctionnaliteUserAuthentifie() {
	$("a.lienAuthentification").hide();
	$("a.lienNouvellepiste").parent().show();
	$("a.lienMesPistes").parent().show();
	$("a.lienDeconnexion").show();
	$('.page .menuFooter').show();
	$('.page .connexionDeconnexion').show();
	$.mobile.changePage("#mesPistesPage", "slidefade");
	
	$("#mesPistesPage .lienMesPistes").addClass('ui-btn-active');
	$("#mesPistesPage .lienListePiste").removeClass('ui-btn-active');
	$("#mesPistesPage .lienMBP").removeClass('ui-btn-active');
	$("#mesPistesPage .lienNouvellepiste").removeClass('ui-btn-active');
	$("#mesPistesPage .lienAuthentification").removeClass('ui-btn-active');
	$("#mesPistesPage .lienDeconnexion").removeClass('ui-btn-active');
	
	afficherMesPistes();
}