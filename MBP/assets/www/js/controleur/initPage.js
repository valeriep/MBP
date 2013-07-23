var latitude;
var longitude;
var listDesPistes = new Array();

function init(){
	document.addEventListener("deviceready", function(){

		if(navigator.network.connection.type == Connection.NONE){
			alert("pas de connexion internet");
		}
		else {

			if(navigator.geolocation){
				//	alert("dans geoloc");
				navigator.geolocation.getCurrentPosition(creationBDD, onError);
			}

			else{
				alert('no geolocation support');
				listPistAll();
			}
		}

		// affichage des pistes du telephone de la derniere synchro 

	});

}

//Declaration de la methode qui appelle la methode de selection (du modele(dao))
function recupererDetailPisteControleur(nomPiste) {
	if(nomPiste != null){
		recupererDetailPiste(nomPiste);
	}
	else {
		alert("le nom de la piste selectionné est null");

	}
}


//affichage d'une liste de piste dans result suite à appel select dans la page
function AfficherListePiste(lesPistes) {
	var len = lesPistes.length;

	//alert("la piste" + lesPistes[0]);
	var nom;
	var id;
	var photo;
	var noteGlobale;

	$('#liste_pistes li').remove();
	if (lesPistes != null ) {
		for (nb = 0; nb < lesPistes.length; nb++) {
			var divStar = "star" + nb ;
			id = lesPistes[nb].id
			nom = lesPistes[nb].nom;

			photo = lesPistes[nb].photo;

			couleur = lesPistes[nb].couleur;

			noteGlobale = lesPistes[nb].noteGlob;

			$('#liste_pistes').append('<li><div class="piste"><div class="photo"><img src="' + photo +'" alt="Piste" width="50px" height="50px"></div>' +
					'<div class="texte"><h2><a href="detailPiste.html?id=' + id + '">' + nom + 
					'<div style="background-color:'+couleur+'" class="couleur img-circle"></div></h2></div>' +
					'<div class="note_globale">' + 
					'<span>Note </span> <strong>' + noteGlobale + '</strong></div>' + 
					'<div id="' + divStar  + '" data-score="' + noteGlobale + '" disabled="disabled">' +
			'</div></div>');
			$("#" + divStar ).raty({
				readOnly  : true,
				width: false,
				path : "./images/",
				score: function() {
					return $(this).attr('data-score');
				}

			}
			);

		}
		//alert("fin de la boucle");
		$('#liste_pistes').listview('refresh');
	}

}

//Fonction de callback onSuccess, reçoit un objet Position

function creationBDD(position) {

	alert("votre position : longitude " + position.coords.longitude +"\nlatitude : " + position.coords.latitude);
	var listPisteSeolan = getPisteList(latitude, longitude);
	initbdd(listPisteSeolan);
	listPistAll();

}

//Fonction de callback onError, reçoit un objet PositionError

function onError(error) {
	alert('code erreur geolocalisation : '    + error.code    + '\n' +
			'message : ' + error.message + '\n');
}
