
function afficherContenueNouvellePiste() {
	$('#pays').html('<option>Select the country</option>');
	$('#massif').html('<option>Select the massif</option>');
	$('#station').html('<option>Select the station</option>');
	$('#couleur').html('<option>Select the color</option>');
	
	listPaysAll();
	listMassifAll();
	
	listStationAll(); 	// Pas besoin.. Elle va etre appeler automatiquement par les massifs
						// (on ne peut pas faire cela entre les pays et les massifs 
						// car un massif peut appartenir à plusieurs pays,  du coup on aura deux fois le même massif..)
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
}

function afficherMassifDUneStation(massif) {	
	$('#massif option[value="'+massif.oid+'"]').prop('selected', true);
	// Pour gagner du temps, on peut appeler la methode qui selectionne le pays d'un massif
	paysDUnMassif(massif.oid);
}

function controleFormulaireAjoutPiste() {
		
	if ($('#nom_nouvelle_piste').val() != "" 
	//	 && document.getElementById('pays').selectedIndex != 0
	//	 && document.getElementById('massif').selectedIndex != 0 
	//	 && document.getElementById('station').selectedIndex != 0
		)
		{
		var photo = $('#photo').attr('src');
		
		var newPiste = new NouvellePiste($('#nom_nouvelle_piste').val(),
							document.getElementById('pays').value, document.getElementById('massif').value,
							document.getElementById('station').value, document.getElementById('couleur').value, $('#description').val(), $('#motsCles').val(), photo);
		
		enregisterNouvellePiste(newPiste);
		// Actualiser Mes Pistes
		afficherMesPistes(); 		
		return true;
		}

	navigator.notification.alert("Veuillez remplir tous les champs obligatoires");

	return false;	
}
