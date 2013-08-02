
function afficherContenueNouvellePiste() {
	$('#pays').html('<option>Select the country</option>');
	$('#massif').html('<option>Select the massif</option>');
	$('#station').html('<option>Select the station</option>');
	$('#couleur').html('<option>Select the color</option>');
	
	listPaysAll();
	listMassifAll();
	listStationAll();
	listCouleurAll();
	
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
	//$('#massif').append('<option> Autre </option>');
}

function afficherContenuListeMassif(lesMassifs) {
	for ( var i = 0;i < lesMassifs.length;i++) {
		$('#massif').append('<option value="'+lesMassifs[i].oid+'">'+lesMassifs[i].nom+'</option>');
		// Pour gagner du temps, et pour lister les stations d'un pays, 
		// on peut appeler la methode qui donne les stations de chaque massif
		listStationDUnMassif(lesMassifs[i].oid);
	}
	//$('#massif').append('<option> Autre </option>');
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
		$('#couleur').append('<option id="'+lesCouleurs[i].oid+'" value="'+lesCouleurs[i].couleur+'">'+lesCouleurs[i].libelle+'</option>');
	}
}

function afficherPaysDUnMassif(pays) {
	$('#pays option[value="'+pays.oid+'"]').prop('selected', true);
}

function afficherMassifDUneStation(massif) {	
	$('#massif option[value="'+massif.oid+'"]').prop('selected', true);
	
	// Pour gagner du temps, on peut appeler la methode qui selectionne le pays d'un massif
	paysDUnMassif(massif.oid);
}

