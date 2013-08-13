var latitude;
var longitude;
var listDesPistes = new Array();

function init(){
	$('#contenuPageChargementListPistes').show();
	
	document.addEventListener("deviceready", function(){
		if(navigator.network.connection.type == Connection.NONE || navigator.network.connection.type == Connection.UNKNOWN){
			navigator.notification.alert("pas de connexion internet");
			connected = false;
			
			// TODO
			//affichage des pistes stockées sur le telephone s'il y en a
			//if(ilyadespistes())
			if(true) listPistAll();
			else navigator.notification.alert("pas de piste disponible");
		}
		else {
			connected = true;
			if(navigator.geolocation) {
				// TODO  : A REMETTRE COMME AVANT : C'EST JUSTE UN TEST, QUAND LA GEO MARCHE PAS SUR LE TEL...
				navigator.geolocation.getCurrentPosition(creationBDD, onError);
				//creationBDD(11);
			}
			else  navigator.notification.alert('Veuillez activer le GPS');
		}
	}); 
}

//Fonction de callback onSuccess, reçoit un objet Position

function creationBDD(position){
	//alert("votre position : longitude " + position.coords.longitude +"\nlatitude : " + position.coords.latitude);
	
	//appel du service de recuperation des couleurs
	var listCouleursSeolan = getListeCouleurs();
	
	//appel du service de recuperation des stations
	var listStationsSeolan = getListeStations();
	
	//appel du service de recuperation des massifs
	var listMassifsSeolan = getListeMassifs();
	
	// appel du service de recuperation de l'ensemble des pistes
	var listPisteSeolan = getListePiste(latitude, longitude);
	
	// appel du service de recuperation de l'ensemble des pays
	var listPaysSeolan = getListePays();
	
	initbdd(listPisteSeolan, listCouleursSeolan, listStationsSeolan, listMassifsSeolan, listPaysSeolan);
	
	// quand l'utilisateur est connecter à internet, on l'oblige de se re-authentifier pour re-enregistrer ses pistes..
  	$('a.lienMesPistes').replaceWith('<a href = "#" class="lienAuthentification" data-role="button" data-transition="slidefade">S\'Authentifier</a>');
  	$('#accueilListe a.lienAuthentification').trigger('click');
  	
	setTimeout(function(){
		listPistAll();
		$('#loginPage #loginForm').trigger('submit');
	},3000);
}

//Fonction de callback onError, reçoit un objet PositionError

function onError(error) {
	alert('code erreur geolocalisation : '    + error.code    + '\n' +
			'message : ' + error.message + '\n');
}
