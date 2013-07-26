
afficherCodeListePistes();

function afficherCodeListePistes(){
	$('#contenuPage').html('<ul id="liste_pistes" data-role="listview"></ul>');
	listPistAll();
}

//affichage d'une liste de piste dans result suite à appel select dans la page
function afficherContenuListePiste(lesPistes) {
	var len = lesPistes.length;
	var nom;
	var id;
	var photo;
	var noteGlobale;
	
	$('.bouton_retour').remove();
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
						'<a id="'+id+'" class="classIdPisteSelectionnee" href="#detailPistPage">' + nom +	
							'<div class="piste">'+
								'<div class="photo">'+
									'<img src="' + photo +'" alt="Piste" width="50px" height="50px">'+
								'</div>'+
								'<div class="texte">'+
									'<h2>'+
										'<div style="background-color:'+couleur+'" class="couleur img-circle">'+
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
		
		// Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
		// "DetailPisteControleur()" pour avoir tous les details d'une piste
		$(".classIdPisteSelectionnee").bind ("click", function (event)
		{
			var idPiste = this.id;
		 	var pisteSelec;		
		 	
			recupererDetailPisteControleur(idPiste);
			insererCodeDetailPiste();
			
			// Attendre une seconde.. pour que la variable "pisteSelectionnee" soit 
			// remplie (par la methode "recupererDetailPisteControleur") et que le code de la detail de la piste soit chargé
			// car les fonctions en javascript s'executent de façon asynchrones 
			setTimeout(
			    function () {
			    	pisteSelec = getPisteSelectionnee();
			    	afficherContenueDetailPiste(pisteSelec);
			    },1000);											  												 
		});
		
		$('#liste_pistes').listview('refresh');
	}

}