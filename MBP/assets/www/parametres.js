/******************variables globales utilisées dans toutes l'application************************/
var connected;

/**********************************Liens Pages***************************************************/
//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$(".lienListePiste").live ("click", function (event)
{
	$.mobile.changePage("#accueilListe", "slidefade");
	$(".lienListePiste").removeClass('ui-btn-active');
	$(".lienNouvellepiste").removeClass('ui-btn-active');
	$(".lienMBP").removeClass('ui-btn-active');
	$(".lienMesPistes").removeClass('ui-btn-active');
	$(".lienAuthentification").removeClass('ui-btn-active');
	$(".lienListePiste").addClass('ui-btn-active');
});

$(".lienNouvellepiste").live ("click", function (event)
{	 
  if(window.localStorage["usernameMBP"] == undefined || window.localStorage["passwordMBP"] == undefined) {
  	alert("vous devez vous authentifier pour ajouter des nouvelles pistes");
  }
  else
  {	    	
		$.mobile.changePage("#nouvelPistePage", "slidefade");
		$(".lienNouvellepiste").removeClass('ui-btn-active');	
		$(".lienListePiste").removeClass('ui-btn-active');
		$(".lienMBP").removeClass('ui-btn-active');
		$(".lienMesPistes").removeClass('ui-btn-active');
		$(".lienAuthentification").removeClass('ui-btn-active');
		$(".lienNouvellepiste").addClass('ui-btn-active');
		
		insererCodeNouvellePiste();
  }
});

$(".lienAuthentification").live ("click", function (event)
{
	if(navigator.network.connection.type == Connection.NONE || navigator.network.connection.type == Connection.UNKNOWN)
	{
		navigator.notification.alert('Connectez-vous à internet !');
	}
	else
	{
		$.mobile.changePage("#loginPage", "slidefade");
		$(".lienAuthentification").removeClass('ui-btn-active');
		$(".lienListePiste").removeClass('ui-btn-active');
		$(".lienNouvellepiste").removeClass('ui-btn-active');
		$(".lienMBP").removeClass('ui-btn-active');
		$(".lienAuthentification").addClass('ui-btn-active');
		
		insererCodeAuthentification();
	}
});

//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$(".lienMesPistes").live ("click", function (event)
{
	$.mobile.changePage("#mesPistesPage", "slidefade");
	$(".lienMesPistes").removeClass('ui-btn-active');
	$(".lienListePiste").removeClass('ui-btn-active');
	$(".lienNouvellepiste").removeClass('ui-btn-active');
	$(".lienMBP").removeClass('ui-btn-active');
	$(".lienMesPistes").addClass('ui-btn-active');
	
	afficherMesPistes();
});


/****************************** Liens vers les Details d'une pistes**************************/
//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction
// "DetailPisteControleur()" pour avoir tous les details d'une piste
$(".classIdPisteSelectionnee").live
	("click",
	function (event){
		var idPiste = this.id;
		var pisteSelec;	
			
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

// Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
// "DetailPisteControleur()" pour avoir tous les details d'une piste
$('#boutonNoterLaPiste').live ("click", function (event)
{
	alert("zzzz");
	
	$.mobile.changePage("#NotesPistPage", "slidefade");
	/*
	TODO
	var tabNotes = new..
	insererCodeNotesPiste(id,tabNotes); ....
	*/
});

/* Liens pour la Camera et les photos*/

//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$(".photoCamera").live ("click", function (event)
{
	prendrePhoto();
});

$(".photoLibrairie").live ("click", function (event)
{
	selectPicture();
});
