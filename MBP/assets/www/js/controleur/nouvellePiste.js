var idPisteAModifierSelectionnee; 

function afficherContenueNouvellePiste(pisteAModifier) {
	// Refreshir la page...
	$.mobile.autoInitializePage = false;
	
	$('#pays').html('<option value="">Select the country</option>');
	$('#massif').html('<option value="">Select the massif</option>');
	$('#station').html('<option value="">Select the station</option>');
	$('#couleur').html('<option value="">Select the color</option>');
	
	
	
	//$('#couleur').css('background-color', 'white');
	
	listPaysAll();
	listMassifAll();	
	listStationAll(); 	// Pas besoin.. Elle va etre appeler automatiquement par les massifs
						// (on ne peut pas faire cela entre les pays et les massifs 
						// car un massif peut appartenir à plusieurs pays,  du coup on aura deux fois le même massif..)
	listCouleurAll();
	
	
	idPisteAModifierSelectionnee = null;
	
	var form = $("#formNouvellePiste");
	
	if(pisteAModifier != null){
		
		idPisteAModifierSelectionnee = pisteAModifier.id;
		
		recupererMotsCles(pisteAModifier.id);
		
		$("#nom_nouvelle_piste", form).val(pisteAModifier.nom);
		$("#description", form).val(pisteAModifier.descr);
		
		setTimeout(function(){
			// Cette boucle permet de selectionner une option à partir de son texte
			$("#pays option").each(function()
			{
			  if($(this).text() ==  pisteAModifier.pays){
				  $('#pays option[value="'+$(this).val()+'"]').prop("selected", true);
				  $("#pays").selectmenu("refresh");
				  //$('#pays').val($(this).val());
			  }
			});
			
			$("#massif option").each(function()
			{
			  if($(this).text() ==  pisteAModifier.massif){
				  $('#massif option[value="'+$(this).val()+'"]').prop("selected", true);
				  $("#massif").selectmenu("refresh");
			  }
			});
			
			$("#station option").each(function()
			{
			  if($(this).text() ==  pisteAModifier.station){
				  $('#station option[value="'+$(this).val()+'"]').prop("selected", true);
				  $("#station").selectmenu("refresh");
			  }
			});
			
			//TODO
			if(pisteAModifier.couleur != "null"){
				$('#couleur option[value="Couleur:'+pisteAModifier.couleur+'"]').prop("selected", true);
				//$('#couleur').css('background-color', ''+pisteAModifier.couleur+'');
				$("#couleur").selectmenu("refresh");
			}
			
			if(pisteAModifier.photo !=""){
				
				$("#photoPiste").attr('value',"Modifier la photo");
				
				var img = document.getElementById('photo');
				img.style.visibility = "visible";
				img.style.display = "block";
				img.src = pisteAModifier.photo;
			}
			
			$('#contenuPageChargementNouvellePiste').hide();
		}, 500);
		
		// Afficher le bouton supprimer ! qui supprimer la piste:
		$("#suppressionPiste").show();
	}
	else {
		/* Réinitialisation des champs*/
		$("#nom_nouvelle_piste", form).val("");
		$("#description", form).val("");
		remplirChampMotsCles(null);
		
		$("#pays").selectmenu("refresh");
		$("#massif").selectmenu("refresh");
		$("#station").selectmenu("refresh");
		$("#couleur").selectmenu("refresh");
		
		var img = document.getElementById('photo');
		img.style.visibility = "hidden";
		img.style.display = "none";
		img.src = "";
		$("#suppressionPiste").hide();
		
		$('#contenuPageChargementNouvellePiste').hide();
		
	}
}

function recupererListeAllPays(){
	listPaysAll();
}

function recupererListeAllMassifs(){
	listMassifAll();
}

function recupererListeAllStations(){
	listStationAll();
}

function recupererListeMassifDUnPays(idPays){
	listMassifDUnPays(idPays);
}

function recupererListeStationDUnMassif(idMassif){
	listStationDUnMassif(idMassif);
}

function recupererPaysDUnMassif(idMassif){
	paysDUnMassif(idMassif);
}

function recupererMassifDUneStation(idStation){
	massifDUneStation(idStation);
}

function afficherContenuListePays(lesPays) {
	for ( var i = 0;i < lesPays.length;i++) {
		$('#pays').append('<option value="'+lesPays[i].oid+'">'+lesPays[i].nom+'</option>');
	}
}

function afficherContenuListeMassif(lesMassifs) {
	for ( var i = 0;i < lesMassifs.length;i++) {
		$('#massif').append('<option value="'+lesMassifs[i].oid+'">'+lesMassifs[i].nom+'</option>');
	}

}

function afficherContenuListeMassifDUnPays(lesMassifs) {
	for ( var i = 0;i < lesMassifs.length;i++) {
		$('#massif').append('<option value="'+lesMassifs[i].oid+'">'+lesMassifs[i].nom+'</option>');
		// Pour gagner du temps, et pour lister les stations d'un pays, 
		// on peut appeler la methode qui donne les stations de chaque massif
		listStationDUnMassif(lesMassifs[i].oid);
	}
}

//afficher les stations d'un massif
function afficherContenuListeStation(lesStations) {
	for ( var i = 0;i < lesStations.length;i++) {
		$('#station').append('<option value="'+lesStations[i].oid+'">'+lesStations[i].nom+'</option>');
	}
}

//afficher tous les couleurs
function afficherContenuListeCouleur(lesCouleurs) {
	for ( var i = 0; i < lesCouleurs.length; i++) {
		$('#couleur').append('<option data-id="'+lesCouleurs[i].couleur+'" value="'+lesCouleurs[i].oid+'">'+lesCouleurs[i].libelle+'</option>');
	}
}

function afficherPaysDUnMassif(pays) {
	$('#pays option[value="'+pays.oid+'"]').prop('selected', true);
	$("#pays").selectmenu("refresh");
}

function afficherMassifDUneStation(massif) {	
	$('#massif option[value="'+massif.oid+'"]').prop('selected', true);
	$("#massif").selectmenu("refresh");
	// Pour gagner du temps, on peut appeler la methode qui selectionne le pays d'un massif
	paysDUnMassif(massif.oid);

}

function remplirChampMotsCles(lesMotsCles){
	var form = $("#formNouvellePiste");
	if(lesMotsCles != null)
		$("#motsCles", form).val(lesMotsCles);
	else
		$("#motsCles", form).val("");
}

function controleFormulaireAjoutPiste() {
		
	if ($('#nom_nouvelle_piste').val() != "" 
		 && document.getElementById('pays').selectedIndex != 0
		 && document.getElementById('massif').selectedIndex != 0 
		 && document.getElementById('station').selectedIndex != 0
		)
		{
		var photo = $('#photo').attr('src');
		
		var newPiste = new NouvellePiste($('#nom_nouvelle_piste').val(),
							document.getElementById('pays').value, document.getElementById('massif').value,
							document.getElementById('station').value, document.getElementById('couleur').value,
							$('#description').val(), $('#motsCles').val(), photo);
		
		enregisterPiste(newPiste, idPisteAModifierSelectionnee);
		
		return true;
		}

	return false;	
}
