var latitude;
var longitude;
var listDesPistes = new Array();

function init(){
	document.addEventListener("deviceready", function(){		
		if(navigator.network.connection.type == Connection.NONE || navigator.network.connection.type == Connection.UNKNOWN){
			alert("pas de connexion internet");
			connected = false;
		} 
		else {
			connected = true;
			if(navigator.geolocation){
				//alert("dans geoloc");
				navigator.geolocation.getCurrentPosition(creationBDD, onError);
			}
			else{
				alert('no geolocation support');
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
	//alert("votre position : longitude " + position.coords.longitude +"\nlatitude : " + position.coords.latitude);

	var listCouleursSeolan = getListeCouleurs();
	var listStationsSeolan = getListeStations();
	var listMassifsSeolan = getListeMassifs();
	
	var listPisteSeolan = getPisteList(latitude, longitude);
	
	initbdd(listPisteSeolan, listCouleursSeolan, listStationsSeolan, listMassifsSeolan);
	
	setTimeout(function() {
		listPistAll();
	},1000);
}


//Fonction de callback onError, reçoit un objet PositionError

function onError(error) {
	alert('code erreur geolocalisation : '    + error.code    + '\n' +
			'message : ' + error.message + '\n');
}
