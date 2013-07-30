var latitude;
var longitude;
var listDesPistes = new Array();

function init(){
	
	document.addEventListener("deviceready", function(){	
		
		if(navigator.network.connection.type == Connection.NONE || navigator.network.connection.type == Connection.UNKNOWN){
			alert("pas de connexion internet");
			connected = false;
			//affichage des pistes stockées sur le telephone s'il y en a
			if(ilyadespistes()){
				listPistAll();}
			else {
				alert("pas de piste disponible");}
		} 
		else {
			connected = true;
		
			if(navigator.geolocation){
				//alert("dans geoloc");
				navigator.geolocation.getCurrentPosition(creationBDD, onError);
			}
			else{
				alert('Veuillez activer le GPS');
			}
		}
		// affichage des pistes du telephone de la derniere synchro 
	});
	
}

//Declaration de la methode qui appelle la methode de selection (du modele(dao))
function recupererDetailPisteControleur(idPiste) {
	if(idPiste != null){
		recupererDetailPiste(idPiste);
	}
	else {
		alert("l'id de la piste selectionné est null");
	}
}

//Fonction de callback onSuccess, reçoit un objet Position

function creationBDD(position) {
	alert("votre position : longitude " + position.coords.longitude +"\nlatitude : " + position.coords.latitude);
	
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
	
	setTimeout(function() {
		//alert("appel liste piste all");
		listPistAll();
	},1000);
}


//Fonction de callback onError, reçoit un objet PositionError

function onError(error) {
	alert('code erreur geolocalisation : '    + error.code    + '\n' +
			'message : ' + error.message + '\n');
}
