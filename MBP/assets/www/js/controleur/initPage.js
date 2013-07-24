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
function recupererDetailPisteControleur(idPiste) {
	if(idPiste != null){
		recupererDetailPiste(idPiste);
	}
	else {
		alert("l'id de la piste selectionné est null");

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
			//var divStar = "star" + nb ;
			id = lesPistes[nb].id
			nom = lesPistes[nb].nom;

			photo = lesPistes[nb].photo;

			couleur = lesPistes[nb].couleur;
			noteGlobale = lesPistes[nb].noteGlob;
			idDivNote= "note"+id;
				
			$('#liste_pistes').append(
					'<li data-icon="arrow-r">'+
						'<a id="'+id+'" class="classIdPisteSelectionnee" href="#detailPistPage">' + nom +	
							'<div class="piste">'+
								'<div class="photo">'+
									'<img src="' + photo +'" alt="Piste" width="50px" height="50px">'+
								'</div>'+
								'<div class="texte">'+
									'<h2>'+
										'<div style="background-color:'+couleur+'" class="couleur img-circle">'+
										'</div>'+
									'</h2>'+	
								'</div>'+
								'<div class="note_globale">'+ 
									'<span>Note </span>'+
									'<strong>' + noteGlobale + '</strong>'+ 
									'<div id="'+idDivNote+'">'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</a>'+
					'</li>');
			
			note(idDivNote, noteGlobale); // remplir le div avec la note
		}
		
		// Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
		// "DetailPisteControleur()" pour avoir tous les details d'une piste
		$(".classIdPisteSelectionnee").bind ("click", function (event)
		{
			var idPiste = this.id;
		 	var pisteSelec;		
		 	
			recupererDetailPisteControleur(idPiste);
			
			// Attendre une seconde.. pour que la variable "pisteSelectionnee" soit 
			// remplie (par la methode "recupererDetailPisteControleur")
			// car les fonctions en javascript s'executent de façon asynchrones 
			setTimeout(
			    function () {
			    	pisteSelec = getPisteSelectionnee();
			    	AfficherDetailPiste(pisteSelec);
			    },1000);											  												 
		});
		
		
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
