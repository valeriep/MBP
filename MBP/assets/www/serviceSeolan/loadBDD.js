var domaine = 'http://dynastar-chrome.xsalto.com';
var serviceListePistes = domaine+"/tzr/scripts/admin.php?moid=40&function=browseJSON";
var serviceMesPistes = domaine+"/tzr/scripts/admin.php?moid=40&function=mesPistes";
var serviceCouleur = domaine+"/tzr/scripts/admin.php?moid=44&function=browseJSON";
var serviceStation = domaine+"/tzr/scripts/admin.php?moid=47&function=browseJSON";
var serviceMassif = domaine+"/tzr/scripts/admin.php?moid=46&function=browseJSON";
var servicePays = domaine+"/tzr/scripts/admin.php?moid=45&function=browseJSON";
var serviceAuthUser =  domaine+"/tzr/scripts/admin.php?moid=43&function=login";
var serviceMesPistes = domaine+"/tzr/scripts/admin.php?moid=40&function=mesPistes";

//Service de recup�ration de la table piste s�olan
function getListePiste(latitude, longitude) {
	var pistesSeolan;
 	// TODO
	// il faudra par la suite envoyer la longitude et latitude � SEOLAN
	// pour recuperer les pistes les plus proches du point geographique
	
    $.ajax({async: false,type: "POST",url: serviceListePistes,dataType: "json",
        success: function(data){ pistesSeolan = data; }
    });
    return pistesSeolan;
}

//Service de recup�ration de la table piste s�olan
function getMesPistes() {
	var pistesSeolan;
 	// TODO
	// il faudra par la suite envoyer la longitude et latitude � SEOLAN
	// pour recuperer les pistes les plus proches du point geographique
	
    $.ajax({async: false,type: "POST",url: serviceListePistes,dataType: "json",
        success: function(data){ pistesSeolan = data; }
    });
    return pistesSeolan;
}

// Service de recup�ration de la table couleur s�olan
function getListeCouleurs() {
	var couleursSeolan;

    $.ajax({async: false,type: "POST",url: serviceCouleur,dataType: "json",
        success: function(data){ couleursSeolan = data; }
    });
    return couleursSeolan;
}

//Service de recup�ration de la table Station s�olan
function getListeStations() {
	var stationsSeolan;

 $.ajax({async: false,type: "POST",url: serviceStation,dataType: "json",
     success: function(data){ stationsSeolan = data; }
 });
 return stationsSeolan;
}

//Service de recup�ration de la table Massif s�olan
function getListeMassifs() {
	var massifsSeolan;

 $.ajax({async: false,type: "POST",url: serviceMassif,dataType: "json",
     success: function(data){ massifsSeolan = data; }
 });
 return massifsSeolan;
}


//Service de recup�ration de la table Pays s�olan
function getListePays() {
	var paysSeolan;

$.ajax({async: false,type: "POST",url: servicePays,dataType: "json",
   success: function(data){ paysSeolan = data; }
});
return paysSeolan;
}


//Service d'authentification
function authentifierUser(login, mdp) {
	  $.post(serviceAuthUser, {'username':login,'password':mdp}, function(res) {
	         if(res == true) {
	        	// Enregistrer les pistes de cet utilisateur dans la base de donn�e             
	        	EnregistrerPistesUtilisateur();
	        	
	        	// Ajouter quelque fonctionnalit�s (Mes Pistes..)
	        	afficherCodeFonctionnaliteUserAuthentifie();
	        	
	        	// Enregistrer le login et le mot de passe dans le localStorage 
	            window.localStorage["usernameMBP"] = login;
	            window.localStorage["passwordMBP"] = mdp;
	            window.localStorage["authentified"] = "true";
	            authentified = "true";
	         }
	         else {
	        	// supprimer le login et le mot de passe s'ils existent dans le localStorage 
	        	localStorage.removeItem("usernameMBP");
	        	localStorage.removeItem("passwordMBP");
	        	window.localStorage["authentified"] = "false";
	         }
	         $("#submitButton").removeAttr("disabled");

	  },'json');
}

//Service de recup�ration des pistes s�olanes  d'un utilisateur 
function getMesPistes() {
	var mesPistesSeolan;
	
    $.ajax({async: false,type: "POST",url: serviceMesPistes,dataType: "json",
        success: function(data){ mesPistesSeolan = data; }
    });
    return mesPistesSeolan;
}
