/*variables globales utilis�es dans toutes l'application*/

var connected;

// Dans le cas o� on clique sur un lien d'une piste, cela appelle la fonction 
// "DetailPisteControleur()" pour avoir tous les details d'une piste
$(".classNouvellePiste").bind ("click", function (event)
{
	insererCodeNouvellePiste(); 
});
