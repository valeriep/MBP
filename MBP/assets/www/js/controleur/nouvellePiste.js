
function afficherContenueNouvellePiste() {
	// TODO: listPaysAll().....
	
	listMassifAll();
	listStationAll();
	
	listCouleurAll();
}

function afficherContenuListeMassif(lesMassifs) {
	$('#massif').html('<option>Select the massif</option>');
	
	for ( var i = 0;i < lesMassifs.length;i++) {
		$('#massif').append('<option value="'+lesMassifs[i].oid+'">'+lesMassifs[i].nom+'</option>');
	}
	//$('#massif').append('<option> Autre </option>');
}

function afficherMassifDUneStation(massif) {	
	$('#massif option[value="'+massif.oid+'"]').prop('selected', true);
}

function recupererListeStationDUnMassif(idMassif){
	listStationDUnMassif(idMassif);
}

function recupererListeMassifDUneStation(idStation){
	listMassifDUneStation(idStation);
}

function recupererListeAllStations(){
	listStationAll();
}

// afficher les stations d'un massif
function afficherContenuListeStation(lesStations) {
	$('#station').html('<option>Select the station</option>');
	for ( var i = 0;i < lesStations.length;i++) {
		$('#station').append('<option value="'+lesStations[i].oid+'">'+lesStations[i].nom+'</option>');
	}
}

//afficher tous les couleurs
function afficherContenuListeCouleur(lesCouleurs) {
	$('#couleur').html('<option>Select the color</option>');
	for ( var i = 0;i < lesCouleurs.length;i++) {
		$('#couleur').append('<option value="'+lesCouleurs[i].oid+'" style="background-color:'+lesCouleurs[i].couleur+';">'+lesCouleurs[i].libelle+'</option>');
	}
}