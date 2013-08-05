/*variables globales utilisées dans toutes l'application*/

var connected;

// Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
// "DetailPisteControleur()" pour avoir tous les details d'une piste
$(".lienNouvellepiste").bind ("click", function (event)
{
	$.mobile.changePage("#nouvelPistePage", "slide");
	
	$(".lienNouvellepiste").removeClass('ui-btn-active');	
	$(".lienListePiste").removeClass('ui-btn-active');
	$(".lienMBP").removeClass('ui-btn-active');
	
	$(".lienNouvellepiste").addClass('ui-btn-active');
		
	insererCodeNouvellePiste(); 
});


//Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
//"DetailPisteControleur()" pour avoir tous les details d'une piste
$(".lienListePiste").bind ("click", function (event)
{
	$.mobile.changePage("#accueilListe", "slide");
	alert("eee");
	$(".lienListePiste").removeClass('ui-btn-active');
	$(".lienNouvellepiste").removeClass('ui-btn-active');
	$(".lienMBP").removeClass('ui-btn-active');
	$(".lienListePiste").addClass('ui-btn-active');
});
