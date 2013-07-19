
/* Cette fonction met une note sous forme des etoiles
 * @param: l'id de l'element dans lequel on va mettre la note
 * @param: la note
 */
function note(idDiv, note){
	
	var divStar = "star" + idDiv;
	
	document.write('<div id="' + divStar  + '" data-score="' + note + '" disabled="disabled">' +
			'</div>');
	$("#" + divStar).raty({
		readOnly  : true,
		width: false,
		path : "./images/",
		score: function() {
		return $(this).attr('data-score');
		}
		});
	}