
//Cette fonction permet de remplacer le code courant du contenu de la page par ce code
function insererCodeNouvellePiste(){
	
	$('.bouton_retour').remove();
	$('#monHeader').append('<a class="bouton_retour" data-icon="arrow-l" data-rel="back"'+
			'data-direction="reverse" href="#" data-theme="a">Retour</a>');
	
	// Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
	// "DetailPisteControleur()" pour avoir tous les details d'une piste
	$(".bouton_retour").bind ("click", function (event)
	{
		afficherCodeListePistes(); 
	});
	
	$('#contenuPage').html(

			'<form action="#" method="post">'+
			 
				'<fieldset data-role="fieldcontain">'+
					'<label for="username">Nom de la piste *</label>'+
					'<input type="text" name="nom_nouvelle_piste" id="nom_nouvelle_piste">'+
				'</fieldset>'+
				 
				'<fieldset data-role="fieldcontain">'+
					'<label for="massif">Massif *</label>'+
					'<select class="massifSelected" id="massif" name="massif">'+
					'</select>'+
				'</fieldset>'+

				'<fieldset data-role="fieldcontain">'+
					'<label for="station">Station *</label>'+
					'<select class="stationSelected" id="station" name="station">'+
					'</select>'+
				'</fieldset>'+
			
				'<fieldset data-role="fieldcontain">'+
					'<label for="couleur">Favorite Color:</label>'+
					'<select id="couleur" name="couleur">'+
					'</select>'+
				'</fieldset>'+
				 
				'<fieldset data-role="fieldcontain">'+
					'<label for="hometown">Home Town:</label>'+
					'<input type="text" name="hometown" id="hometown">'+
				'</fieldset>'+
				 
				'<input type="submit" value="Register">'+
				 
			'</form>');
	afficherContenueNouvellePiste();
	
	$('.massifSelected').change(function() {
		var indexMassifSelected = document.getElementById('massif').selectedIndex;
		
		if(indexMassifSelected !=0) {
			// on appelle la fonction qui affiche les stations correspondanntes au massif selectionné
			recupererListeStationDUnMassif(document.getElementById('massif').value);
		}
		else {
			// On recupère toutes les stations
			recupererListeAllStations();
		}
	});
	
	$('.stationSelected').change(function() {
		var indexMassifSelected = document.getElementById('massif').selectedIndex;
		
		// si on n'avait pas encore selectionné le massif:
		if(indexMassifSelected == 0) {
			// on appelle la fonction qui affiche les stations correspondanntes au massif selectionné
			recupererListeMassifDUneStation(document.getElementById('station').value);
		}
	});
	
}
