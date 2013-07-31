
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
					'<input type="text" name="nom_nouvelle_piste" id="nom_nouvelle_piste" required>'+
				'</fieldset>'+
				 
				'<fieldset data-role="fieldcontain">'+
					'<label for="pays">Pays *</label>'+
					'<select class="paysSelected" id="pays" name="pays">'+
					'</select>'+
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
					'<label for="couleur">Couleur de la piste:</label>'+
					'<select class="couleurSelected" id="couleur" name="couleur">'+
					'</select>'+
				'</fieldset>'+
				 
				'<fieldset data-role="fieldcontain">'+
					'<label for="description">Description de la piste</label>'+
					'<textarea rows="4">'+
					'</textarea>'+
				'</fieldset>'+
				
				'<fieldset data-role="fieldcontain">'+
					'<a href="dialogs/ajouterUnePhoto.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="slidedown">'+
						'<input type = "button" name="ajouterUnePhoto" value="Ajouter une photo de la piste">'+
					'</a>'+				
				'</fieldset>'+
		
				'<input type="submit" value="Register">'+
				 
			'</form>');
	afficherContenueNouvellePiste();
	
	$('.paysSelected').change(function() {
		$('#massif').html('<option>Select the massif</option>');
		$('#station').html('<option>Select the station</option>');
		
		var indexPaysSelected = document.getElementById('pays').selectedIndex;
		
		// Si on a cliqué sur un pays
		if(indexPaysSelected !=0) {
			// on appelle la fonction qui affiche les massifs correspondannts au pays selectionné
			recupererListeMassifDUnPays(document.getElementById('pays').value);
		}
		else {
			// On recupère toutes les stations
			recupererListeAllMassifs();
			recupererListeAllStations();
		}
	});
	
	$('.massifSelected').change(function() {
		$('#station').html('<option>Select the station</option>');
		
		var indexMassifSelected = document.getElementById('massif').selectedIndex;
		
		if(indexMassifSelected != 0) {
			// on appelle la fonction qui affiche le pays et les stations correspondanntes au massif selectionné
			recupererListeStationDUnMassif(document.getElementById('massif').value);
			recupererPaysDUnMassif(document.getElementById('massif').value);
		}
		else {
			// On recupère toutes les stations
			recupererListeAllStations();
		}
	});
	
	$('.stationSelected').change(function() {		
		var indexMassifSelected = document.getElementById('massif').selectedIndex;
		
		// on appelle la fonction qui affiche les stations correspondanntes au massif selectionné
		recupererMassifDUneStation(document.getElementById('station').value);
	});
	
	$('.couleurSelected').change(function() {
		var indexCouleurSelected = document.getElementById('couleur').selectedIndex;
		
		// si on n'avait pas encore selectionné le massif:
		if(indexCouleurSelected != 0){
			$('#couleur').css('background-color', ''+document.getElementById('couleur').value+'');
		}
		else
			$('#couleur').css('background-color', 'white');
	});
	
	/*
	$('.ajouterUnePhoto').click(function() {
		
		if ($('#divAjouterPhoto').is(':visible')) {
			$('#divAjouterPhoto').hide();
		}
		else {
			$('#divAjouterPhoto').show();
		}
	});
	*/
}



/* Fonctions pour la Camera et les photos*/

/** * Take picture with camera */
function takePicture() {
	navigator.camera.getPicture(
			function(uri) {
				var img = document.getElementById('camera_image');
				img.style.visibility = "visible";
				img.style.display = "block";
				img.src = uri;            document.getElementById('camera_status').innerHTML = "Success";
				},
			function(e) {
					console.log("Error getting picture: " + e);
					document.getElementById('camera_status').innerHTML = "Error getting picture.";
				},
					{
						quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI
					}
				);
	};