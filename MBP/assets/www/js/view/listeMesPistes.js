

//affichage d'une liste de piste dans result suite à appel select dans la page
function afficherContenuListeMesPistes(mesPistes) {
	var len = mesPistes.length;
	var nom;
	var id;
	var photo;
	var noteGlobale;
	
	$('#liste_mes_pistes li').remove();
	if (mesPistes != null ) {
		for (nb = 0; nb < mesPistes.length; nb++) {
			//var divStar = "star" + nb ;
			id = mesPistes[nb].id
			nom = mesPistes[nb].nom;
			photo = mesPistes[nb].photo;
			couleur = mesPistes[nb].couleur;
			noteGlobale = mesPistes[nb].noteGlob;
			idDivNote= "noteMaPiste"+id;

			$('#liste_mes_pistes').append(
					'<li data-icon="arrow-r">'+
						'<a id="'+id+'" class="classIdPisteSelectionnee" href="#detailPistPage">' + nom +	
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