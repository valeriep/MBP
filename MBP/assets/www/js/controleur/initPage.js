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
				getPisteList(latitude, longitude);
				//initbdd();
			}

			else{
				alert('no geolocation support');
			}
		}
	});

}



	// Fonction de callback onSuccess, reçoit un objet Position
	//
	function onSuccess(position) {
		alert("aa");
		//alert("votre position : longitude " + position.coords.longitude +"\nlatitude : " + position.coords.latitude);
		//getPisteList(position.coords.latitude, position.coords.longitude);
	}

	// Fonction de callback onError, reçoit un objet PositionError
	//
	function onError(error) {
		alert('cest une erreur');
		alert('code erreur geolocalisation : '    + error.code    + '\n' +
				'message : ' + error.message + '\n');
	}
