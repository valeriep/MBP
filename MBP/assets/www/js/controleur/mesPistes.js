/*Fonction qui permet d'enregistrer les pistes d'un utilisateur recup�r�es de seolan sur son telephone */
function EnregistrerPistesUtilisateur(){
	// appel du service de recuperation de l'ensemble des pays
	var listMesPistesSeolan = getMesPistes();
	stockagePiste(listMesPistesSeolan, 1);
}

/* Permet d'appeler la methode qui liste les pistes de l'utilisateur qui sont dans la base de donn�es du t�l�phone */
function afficherMesPistes(){
	listMesPistAll();
}

function supprimerMaPiste(idPisteASupprimer){
	querySupprimerPiste(idPisteASupprimer);
}