
/* Cette fonction met une note sous forme des etoiles
 * @param: l'id de l'element dans lequel on va mettre la note
 * @param: la note
 */
function note(idDiv, note){
	var divStar = "star" + idDiv;

	// Ici on ins�re le code dans la balise correspondante 
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

function transformer1QuoteEn2(chaineInitiale){
	return chaineInitiale.replace(/"/g, '""');
}
/*Ajoute un slashe avant l'apostrophe le quote...*/
function addslashes(str) {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
}

/*supprimer l'antislash..*/
function stripslashes(str) {
    str = str.replace(/\\'/g, '\'');
    str = str.replace(/\\"/g, '"');
    str = str.replace(/\\0/g, '\0');
    str = str.replace(/\\\\/g, '\\');
    return str;
}