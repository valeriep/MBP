/*variables globales utilisées dans toutes l'application*/

var connected;

// Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
// "DetailPisteControleur()" pour avoir tous les details d'une piste
$("#nouvellePiste").bind ("click", function (event)
{
	insererCodeNouvellePiste(); 
});
