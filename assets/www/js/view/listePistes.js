
//affichage du contenu de la liste de pistes
function afficherContenuListePiste(lesPistes) {
	var len = lesPistes.length;
	var nom;
	var id;
	var photo;
	var noteGlobale;
	
	$('#liste_pistes li').remove();
	if (lesPistes != null ) {
		for (nb = 0; nb < lesPistes.length; nb++) {
			//var divStar = "star" + nb ;
			id = lesPistes[nb].id
			nom = lesPistes[nb].nom;
			photo = lesPistes[nb].photo;
			couleur = lesPistes[nb].couleur;
			noteGlobale = lesPistes[nb].noteGlob;
			idDivNote= "note"+id;

			$('#liste_pistes').append(
					'<li data-icon="arrow-r">'+
						'<a id="'+id+'" class="classIdPisteSelectionnee" href="#">' + nom +	
							'<div class="piste">'+
								'<div class="photo">'+
									'<img src="' + photo +'" alt="Piste" width="50px" height="50px">'+
								'</div>'+
								'<div class="texte">'+
									'<h2>'+
										'<div style="background-color:'+couleur+'" class="couleur">'+
										'</div>'+
									'</h2>'+	
								'</div>'+
								'<div class="note_globale">'+
									'<span>Note </span>'+
									'<strong>' + noteGlobale + '</strong>'+
									'<div id="'+idDivNote+'">'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</a>'+
					'</li>');

			note(idDivNote, noteGlobale); // remplir le div avec la note
		}
	}
}

