var latitude;
var longitude;

function init(){
	document.addEventListener("deviceready", function(){

		if(navigator.network.connection.type == Connection.NONE){
			alert("pas de connexion internet");
		}
		else {

			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(onSuccess, onError);
			}

			else{
				alert('no geolocation support');
			}
		}
		//afficheListePiste(pisteAAfficher);
	});

}

// Declaration de la methode qui appelle la methode de selection (du modele(dao))
function recupererDetailPisteControleur(nomPiste) {
	if(nomPiste != null){
		return recupererDetailPiste(nomPiste);
		alert("aaaaaaaa"+ recupererDetailPiste(nomPiste).nom);
		}
	else alert("le nom de la piste selectionné est null");
}


// Fonction de callback onSuccess, reçoit un objet Position
//
function onSuccess(position) {
	alert("votre position : longitude " + position.coords.longitude +"\nlatitude : " + position.coords.latitude);
	var listPisteSeolan = getPisteList(latitude, longitude);
	initbdd(listPisteSeolan);
	//listPistAll();
	//alert("tableau à afficher : " + lesPistes.length);

	
}

//Fonction de callback onError, reçoit un objet PositionError

function onError(error) {
	alert('code erreur geolocalisation : '    + error.code    + '\n' +
			'message : ' + error.message + '\n');
}
