/******************variables globales utilisées dans toutes l'application************************/
var connected = false;
var authentified = window.localStorage.getItem("authentified");
var PageNouvellePisteVisite = 0;  // Variable booleenne pour savoir si on a dejà visité la page "nouvelPistePage" ou pas 
								 // (pour ne pas ré-inserer le code html d'insertion d'une nouvelle piste)

/**********************************Liens Pages***************************************************/ 

/* Cette methode permet de mettre ui-btn-active du menu selon la page */
function initilisationDesLiensDesPages(){
	// Page d'acceuil
	$("#accueilListe .lienListePiste").addClass('ui-btn-active');
	// Page de .. etc..
	$("#NotesPistPage .lienListePiste").addClass('ui-btn-active');
	$("#nouvelPistePage .lienNouvellepiste").addClass('ui-btn-active');
	$("#loginPage .lienAuthentification").addClass('ui-btn-active');
	$("#mesPistesPage .lienMesPistes").addClass('ui-btn-active');
}

//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$(".lienListePiste").live ("tap", function (event)
{
	afficherLesPistes();
	
	$("#accueilListe .lienListePiste").addClass('ui-btn-active');
	$("#accueilListe .lienAuthentification").removeClass('ui-btn-active');
	$("#accueilListe .lienMBP").removeClass('ui-btn-active');
	$("#accueilListe .lienMesPistes").removeClass('ui-btn-active');
	$("#accueilListe .lienNouvellepiste").removeClass('ui-btn-active');
	
	$.mobile.changePage("#accueilListe", "none");
});

$(".lienNouvellepiste").live ("tap", function (event)
{
	if(PageNouvellePisteVisite== 0){
		PageNouvellePisteVisite = 1;
		insererCodeNouvellePiste();
	}
		
	$("#nouvelPistePage .lienNouvellepiste").addClass('ui-btn-active');
	$("#nouvelPistePage .lienListePiste").removeClass('ui-btn-active');
	$("#nouvelPistePage .lienMBP").removeClass('ui-btn-active');
	$("#nouvelPistePage .lienMesPistes").removeClass('ui-btn-active');
	
	if(authentified == "true"){
		afficherContenueNouvellePiste(null);
		
		$.mobile.changePage("#nouvelPistePage", "none");
	}
	else
		navigator.notification.alert("vous devez vous authentifier pour ajouter des nouvelles pistes");
});

$(".lienAuthentification").live ("tap", function (event)
{
	$("#loginPage .lienAuthentification").addClass('ui-btn-active');
	$("#loginPage .lienListePiste").removeClass('ui-btn-active');
	$("#loginPage .lienMBP").removeClass('ui-btn-active');
	
	// Reinitialisé la variable connected à chaque fois que l'utilisateur clique sur ce lien
	connected = !(navigator.network.connection.type == Connection.NONE || navigator.network.connection.type == Connection.UNKNOWN);
	if(connected == false)
		navigator.notification.alert('Connectez-vous \340 internet !');
	else
	{
		$.mobile.changePage("#loginPage", "none");
		insererCodeAuthentification();
	}
});

$(".lienDeconnexion").live ("tap", function (event)
{
	$("a.lienAuthentification").show();
	$("a.lienDeconnexion").hide();
	$("a.lienNouvellepiste").parent().hide();
	$("a.lienMesPistes").parent().hide();
	window.localStorage["authentified"] = "false";
	authentified = "false";
 	navigator.notification.alert("Vous \352tes actuellement d\351connect\351");
 	
 	$.mobile.changePage("#accueilListe", "none");
});

$(".lienMesPistes").live ("tap", function (event)
{
	afficherMesPistes();
	$("#mesPistesPage .lienMesPistes").addClass('ui-btn-active');
	$("#mesPistesPage .lienListePiste").removeClass('ui-btn-active');
	$("#mesPistesPage .lienMBP").removeClass('ui-btn-active');
	$("#mesPistesPage .lienNouvellepiste").removeClass('ui-btn-active');
	$("#mesPistesPage .lienAuthentification").removeClass('ui-btn-active');
	
	$.mobile.changePage("#mesPistesPage", "none");
});

/****************************** Liens vers les Details d'une pistes**************************/
//Dans le cas où on clique sur un lien d'une piste (validée par l'administrateur)
$(".classIdPisteSelectionnee").live("tap", function (event){
		var idPiste = this.id;
		var pisteSelec;	
		recupererDetailPisteControleur(idPiste);
		insererCodeDetailPiste();
		
		$.mobile.changePage("#detailPistPage", "none");
	});

//Dans le cas où on clique sur un lien d'une piste (non validé par l'administrateur)
$(".classModifierMaPiste").live("tap", function (event){
	var idPiste = this.id;
	var pisteSelec;	
	
	// si le code de la page nouvellePiste n'a pas encore été inséré
	if(PageNouvellePisteVisite== 0){
		PageNouvellePisteVisite = 1;
		insererCodeNouvellePiste();
	}
	
	// On rend le lien "Mes Pistes" actif..
	$("#nouvelPistePage .lienMesPistes").addClass('ui-btn-active');
	$("#nouvelPistePage .lienListePiste").removeClass('ui-btn-active');
	$("#nouvelPistePage .lienMBP").removeClass('ui-btn-active');
	$("#nouvelPistePage .lienNouvellepiste").removeClass('ui-btn-active');
	$("#nouvelPistePage .lienAuthentification").removeClass('ui-btn-active');
	modifierDetailNouvellePiste(idPiste);
	
	$.mobile.changePage("#nouvelPistePage", "none");
});

$(".classSupprimererMaPiste").live("tap", function (event){
	supprimerMaPiste(idPisteAModifierSelectionnee);
});

$('#boutonNoterLaPiste').live ("tap", function (event)
{
	alert("TODO");
	
	/*
	//$.mobile.changePage("#NotesPistPage", "none");
	TODO
	*/
});

/* Liens pour la Camera et les photos*/
$(".photoCamera").live ("tap", function (event)
{
	prendrePhoto();
});

$(".photoLibrairie").live ("tap", function (event)
{
	selectPicture();
});


/***************************** Boutons(ou plutôt "liens") de validations des formulaires : **************************/
$('.enregistrerPiste').live ("tap", function (event)
{
	if(controleFormulaireAjoutPiste()){
		navigator.notification.alert("Votre piste a \351t\351 ajout\351, elle sera affich\351e quand elle sera valid\351e par l'administrateur");
		
		afficherMesPistes();
		
		$("#mesPistesPage .lienMesPistes").addClass('ui-btn-active');
		$("#mesPistesPage .lienListePiste").removeClass('ui-btn-active');
		$("#mesPistesPage .lienMBP").removeClass('ui-btn-active');
		$("#mesPistesPage .lienNouvellepiste").removeClass('ui-btn-active');
		$("#mesPistesPage .lienAuthentification").removeClass('ui-btn-active');
		
		$.mobile.changePage("#mesPistesPage", "none");
	}
	else
		navigator.notification.alert("Veuillez remplir tous les champs obligatoires");
});

$('.login').live ("tap", function (event)
{
	authentifierUser();
	return false;
});