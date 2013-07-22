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
				alert("dans geoloc");
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
// Declaration de la methode qui appelle la methode de selection (du modele(dao))
function recupererDetailPisteControleur(nomPiste) {
	alert("dans recuperer..");
	if(nomPiste != null){
		alert("aaaaaaaa"+ recupererDetailPiste(nomPiste).nom);
		return recupererDetailPiste(nomPiste);
		}
	else alert("le nom de la piste selectionné est null");
}


// affichage d'une liste de piste dans results suite à appel select dans la page
function AfficherListePiste(tx,results) {
alert("dans afficher liste");
	var len = results.rows.length;
	lesPistes = new Array(len);

	alert ("boucle for" + len);
	if (len > 0) {
		$('#liste_pistes li').remove();
		for (i = 0; i < len; i++) {
			var index = i;
			var divStar = "star" + index;

			$('#liste_pistes').append('<li><div class="piste"><div class="photo"><img src="' + results.rows.item(i).Photo +'" alt="Piste" width="50px" height="50px"></div>' +
					'<div class="texte"><h2><a href="detailPiste.html?piste.idPiste=' + results.rows.item(i).PisteId + '">' + results.rows.item(i).Nom + 
					'<div style="background-color:'+results.rows.item(i).Couleurd+'" class="couleur img-circle"></div></h2></div>' +
					'<div class="note_globale">' + 
					'<span>Note </span> <strong>' + results.rows.item(i).NotGlob + '</strong></div>' + 
					'<div id="' + divStar  + '" data-score="' + results.rows.item(i).NotGlob + '" disabled="disabled">' +
			'</div></div>');
			$("#" + divStar ).raty({
				readOnly  : true,
				width: false,
				path : "./images/",
				score: function() {
					return $(this).attr('data-score');
				}
			});
		}
	}

	$('#liste_pistes').listview('refresh');

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
