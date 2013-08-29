/*Fonction qui permet d'enregistrer les pistes d'un utilisateur recup�r�es de seolan sur son telephone */
function EnregistrerPistesUtilisateur(){
	// appel du service de recuperation de l'ensemble des pays
	var listMesPistesSeolan = getMesPistes();
	stockagePiste(listMesPistesSeolan, 1);
}

/* Permet d'appeler la methode qui liste les pistes de l'utilisateur qui sont dans la base de donn�es du t�l�phone */
function afficherMesPistes(){
	listMesPistAll();
	
	$("#mesPistesPage .lienMesPistes").addClass('ui-btn-active');
	$("#mesPistesPage .lienListePiste").removeClass('ui-btn-active');
	$("#mesPistesPage .lienMBP").removeClass('ui-btn-active');
	$("#mesPistesPage .lienNouvellepiste").removeClass('ui-btn-active');
	$("#mesPistesPage .lienAuthentification").removeClass('ui-btn-active');
	
	$.mobile.changePage("#mesPistesPage", "slidefade");
}

function supprimerMaPiste(idPisteASupprimer){
	querySupprimerPiste(idPisteASupprimer);
}