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
	$("#detailPistPage .lienListePiste").addClass('ui-btn-active');
	$("#NotesPistPage .lienListePiste").addClass('ui-btn-active');
	$("#nouvelPistePage .lienNouvellepiste").addClass('ui-btn-active');
	$("#loginPage .lienAuthentification").addClass('ui-btn-active');
	$("#mesPistesPage .lienMesPistes").addClass('ui-btn-active');	
}

//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$(".lienListePiste").live ("tap", function (event)
{	$("#accueilListe .lienListePiste").addClass('ui-btn-active');
	$("#accueilListe .lienAuthentification").removeClass('ui-btn-active');
	$("#accueilListe .lienMBP").removeClass('ui-btn-active');
	$("#accueilListe .lienMesPistes").removeClass('ui-btn-active');
	$("#accueilListe .lienNouvellepiste").removeClass('ui-btn-active');
	$.mobile.changePage("#accueilListe", "slidefade");
});

$(".lienNouvellepiste").live ("tap", function (event)
{
	$('#contenuPageChargementNouvellePiste').show();
	
	if(PageNouvellePisteVisite== 0){
		PageNouvellePisteVisite = 1;
		insererCodeNouvellePiste();
	}
		
	$("#nouvelPistePage .lienNouvellepiste").addClass('ui-btn-active');
	$("#nouvelPistePage .lienListePiste").removeClass('ui-btn-active');
	$("#nouvelPistePage .lienMBP").removeClass('ui-btn-active');
	$("#nouvelPistePage .lienMesPistes").removeClass('ui-btn-active');
	
	if(authentified == "true"){
		$.mobile.changePage("#nouvelPistePage", "slidefade");
		setTimeout(function(){
			afficherContenueNouvellePiste(null);
		},1000);
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
		navigator.notification.alert('Connectez-vous à internet !');
	else
	{
		$.mobile.changePage("#loginPage", "slidefade");
		insererCodeAuthentification();
	}
});

$(".lienDeconnexion").live ("tap", function (event)
{
	$.mobile.changePage("#accueilListe", "slidefade");
	
	$("a.lienAuthentification").show();
	$("a.lienDeconnexion").hide();
	$("a.lienNouvellepiste").parent().hide();
	$("a.lienMesPistes").parent().hide();

	window.localStorage["authentified"] = "false";
	authentified = "false";
	
 	navigator.notification.alert("Vous êtes actuellement déconnecté");
});

//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$(".lienMesPistes").live ("tap", function (event)
{
	$("#mesPistesPage .lienMesPistes").addClass('ui-btn-active');
	$("#mesPistesPage .lienListePiste").removeClass('ui-btn-active');
	$("#mesPistesPage .lienMBP").removeClass('ui-btn-active');
	$("#mesPistesPage .lienNouvellepiste").removeClass('ui-btn-active');
	$("#mesPistesPage .lienAuthentification").removeClass('ui-btn-active');
	afficherMesPistes();
	
	$.mobile.changePage("#mesPistesPage", "slidefade");
});


/****************************** Liens vers les Details d'une pistes**************************/
//Dans le cas où on clique sur un lien d'une piste (validée), cela appelle la fonction
// "DetailPisteControleur()" pour avoir tous les details d'une piste
$(".classIdPisteSelectionnee").live
	("tap",
	function (event){
		var idPiste = this.id;
		var pisteSelec;	
		
		$.mobile.changePage("#detailPistPage", "slidefade");
		
		recupererDetailPisteControleur(idPiste);
		insererCodeDetailPiste();
		
		// Attendre un petit peu.. pour que la variable "pisteSelectionnee" soit
		// remplie (par la methode "recupererDetailPisteControleur") et que le code de la detail de la piste soit chargé
		// car les fonctions en javascript s'executent de façon asynchrones
		setTimeout(
				function () {
					pisteSelec = getPisteSelectionnee();							
					afficherContenueDetailPiste(pisteSelec);
				},5000);		
	});

//Dans le cas où on clique sur un lien d'une piste (non validé par l'administrateur), cela appelle la fonction
// "DetailPisteControleur()" pour avoir tous les details d'une piste
$(".classModifierMaPiste").live
	("tap",
	function (event){
		$('#contenuPageChargementNouvellePiste').show();
 	
		// Si le contenu de la balise est vide alors qu'on a déjà visité la page (pas la peine de ré-inserer le code)
		
		if(PageNouvellePisteVisite== 0){
			PageNouvellePisteVisite = 1;
			insererCodeNouvellePiste();
		}
		
		var idPiste = this.id;
		var pisteSelec;	
		
		$.mobile.changePage("#nouvelPistePage", "slidefade");
		
		// On rend le lien "Mes Pistes" actif..
		$("#nouvelPistePage .lienMesPistes").addClass('ui-btn-active');
		$("#nouvelPistePage .lienListePiste").removeClass('ui-btn-active');
		$("#nouvelPistePage .lienMBP").removeClass('ui-btn-active');
		$("#nouvelPistePage .lienNouvellepiste").removeClass('ui-btn-active');
		$("#nouvelPistePage .lienAuthentification").removeClass('ui-btn-active');
		recupererDetailPisteControleur(idPiste);
		//insererCodeModificationPiste();
		
		// Attendre un petit peu.. pour que la variable "pisteSelectionnee" soit
		// remplie (par la methode "recupererDetailPisteControleur") et que le code de la detail de la piste soit chargé
		// car les fonctions en javascript s'executent de façon asynchrones
		setTimeout(
				function () {
					pisteSelec = getPisteSelectionnee();							
					afficherContenueNouvellePiste(pisteSelec);
				},5000);
	});

// Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
// "DetailPisteControleur()" pour avoir tous les details d'une piste
$('#boutonNoterLaPiste').live ("tap", function (event)
{
	alert("TODO");
	
	//$.mobile.changePage("#NotesPistPage", "slidefade");
	/*
	TODO
	var tabNotes = new..
	insererCodeNotesPiste(id,tabNotes); ....
	*/
});

/* Liens pour la Camera et les photos*/

//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$(".photoCamera").live ("tap", function (event)
{
	prendrePhoto();
});

$(".photoLibrairie").live ("tap", function (event)
{
	selectPicture();
});

/* Boutons de validations : */

// Le bouton enregistrer dans la page de modification ou l'ajout d'une piste


$(function() {
	//$("form").submit(function(){
	//do you submit stuff
	//});
	   $("#paynowForm").submit();
	   $("form input[type=submit]").live("click", function() {
	      $("#paynowForm").submit();
	   });
	});


//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$('.enregistrerPiste').live ("tap", function (event)
{
	if(controleFormulaireAjoutPiste()){
		navigator.notification.alert("Votre piste a \351t\351 ajout\351, elle sera affich\351e quand elle sera valid\351e par l'administrateur");
		
		$("#mesPistesPage .lienMesPistes").addClass('ui-btn-active');
		$("#mesPistesPage .lienListePiste").removeClass('ui-btn-active');
		$("#mesPistesPage .lienMBP").removeClass('ui-btn-active');
		$("#mesPistesPage .lienNouvellepiste").removeClass('ui-btn-active');
		$("#mesPistesPage .lienAuthentification").removeClass('ui-btn-active');
		
		$.mobile.changePage("#mesPistesPage", "slidefade");
		// Actualiser Mes Pistes
		afficherMesPistes();
	}
	else
		navigator.notification.alert("Veuillez remplir tous les champs obligatoires");
	
});

