
/* Cette fonction met une note sous forme des etoiles
 * @param: l'id de l'element dans lequel on va mettre la note
 * @param: la note
 */
function note(idDiv, note){
	var divStar = "star" + idDiv;

	// Ici on insère le code dans la balise correspondante 
	$('#'+idDiv+'').html('<div id="' + divStar  + '" data-score="' + note + '" disabled="disabled"> </div>');
	
	$("#" + divStar).raty({
		readOnly  : true,
		width: false,
		path : "./images/",
		score: function() {
		return $(this).attr('data-score');
		}
		});	
}


/* Cette fonction rend une chaine avec un seul espaces entre les mots (s'il y en a plusieur)*/
function transformerPlusieursEspacesEnUnSeul(chainesAvecPlusieursEspaces) {
	
	var chaineAvecUnSeulEspace = chainesAvecPlusieursEspaces.replace("  ", " ");
	
	while(chaineAvecUnSeulEspace != chainesAvecPlusieursEspaces){
		chainesAvecPlusieursEspaces = chaineAvecUnSeulEspace;
		chaineAvecUnSeulEspace =  chaineAvecUnSeulEspace.replace("  ", " ");
	}
	return chaineAvecUnSeulEspace;
}