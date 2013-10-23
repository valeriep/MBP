var latitude;
var longitude;
var listDesPistes = new Array();

function init(){
	document.addEventListener("deviceready", function(){
		// Si l'utilisateur n'a pas de connexion internet
		if(navigator.network.connection.type == Connection.NONE || navigator.network.connection.type == Connection.UNKNOWN){
			navigator.notification.alert("pas de connexion internet");
			connected = false;
			
			// TODO : Vérifier si la base de données existe
			if(bDDExiste()== true){
				listPistAll();
				
				// Si l'utilisateur est authentifié..
				if(authentified == "true"){
					afficherMesPistes();
					$("a.lienAuthentification").hide();
				}
				else{
					alert("utilisateur non authentifie");
					$("a.lienDeconnexion").hide();
					$("a.lienNouvellepiste").parent().hide();
					$("a.lienMesPistes").parent().hide();
				}
				
				$('.page .menuFooter').show();
				$('.page .connexionDeconnexion').show();
			}
			else 
				navigator.notification.alert("La base de donn\351es n\'existe pas, vous devez vous connecter \300 internet");		
		}
		else {
			$.mobile.showPageLoadingMsg("a", "No spinner", true);
			
			connected = true;
			if(navigator.geolocation) {
				// TODO  : A REMETTRE COMME AVANT : C'EST JUSTE UN TEST, QUAND LA GEO MARCHE PAS SUR LE TEL...
				//navigator.geolocation.getCurrentPosition(creationBDD, onError);
				creationBDD(115);
			}
			else
				navigator.notification.alert('Veuillez activer le GPS');
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
	
	// Si l'utilisateur est authentifié..
	if(authentified == "true"){
		var u = window.localStorage.getItem("usernameMBP");
		var p = window.localStorage.getItem("passwordMBP");
		if(u != '' && p != ''){
			authentifierUserChezSeolan(u, p);
		}
		else {
			$("a.lienDeconnexion").hide();
			$("a.lienNouvellepiste").parent().hide();
			$("a.lienMesPistes").parent().hide();
			$('#accueilListe a.lienAuthentification').trigger('tap');
			$('.page .menuFooter').show();
			$('.page .connexionDeconnexion').show();
		}
	}
	else {
		alert("utilisateur non authentifi\351");
		listPistAll();
		
		$("a.lienDeconnexion").hide();
		$("a.lienNouvellepiste").parent().hide();
		$("a.lienMesPistes").parent().hide();
		$('#accueilListe a.lienAuthentification').trigger('tap');
		$('.page .menuFooter').show();
		$('.page .connexionDeconnexion').show();
	}	
}
