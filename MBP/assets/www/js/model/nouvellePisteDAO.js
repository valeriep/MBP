
function listPaysAll(){
	//	select de tous les pays présentes en bdd 
	db.transaction(queryPaysAll,errorHandler );
}

function listMassifAll(){
	//	select de tous les massifs présentes en bdd 
	db.transaction(queryMassifAll,errorHandler );
}

function listStationAll(){
	//	select de tous les massifs présentes en bdd 
	db.transaction(queryStationAll,errorHandler );
}

function listCouleurAll(){
	//	select de toutes les pistes présentes en bdd 
	db.transaction(queryCouleurAll,errorHandler );
}

function listStationDUnMassif(idMassif){
	queryStationDUnMassif(idMassif);
}

function listMassifDUnPays(idPays){
	queryMassifDUnPays(idPays);
}

function paysDUnMassif(idMassif){
	queryPaysDUnMassif(idMassif);
}

function massifDUneStation(idStation){
	//	select de toutes les stations présentes en bdd 
	queryMassifDUneStation(idStation);
}

//Query the database
//recuperation de toutes les stations qui correspondent à un massif selectionné
function queryStationDUnMassif(idDuMassifSelectionne) {
	db.transaction(
		function (tx) {
			tx.executeSql('SELECT * from Station where MassifId = "'+idDuMassifSelectionne+'"', [], traiterLesStations, errorHandler);
		}, errorHandler);
}

//Query the database
//recuperation du massif qui correspond à une station selectionné
function queryMassifDUnPays(idDuPaysSelectionne) {
	//tx.executeSql('SELECT * from Massif where LesPaysId LIKE "%'+idDuPaysSelectionne+'%"', [], traiterLesMassifs, errorHandler);
	
	db.transaction(
			function (tx) {
				tx.executeSql('SELECT * from Massif where LesPaysId LIKE "%'+idDuPaysSelectionne+'%"', [], traiterLesMassifs, errorHandler);
			}, errorHandler);
}

//Query the database
//recuperation des pays qui correspondent à un massif selectionné
function queryPaysDUnMassif(idDuMassifSelectionne) {
	var idsDesPaysDuMassifSelectionne = 'SELECT LesPaysId from Massif';
	/*
	//alert('SELECT * from Pays p where "%"+p.Oid+"%" like (SELECT LesPaysId from Massif where Oid = "'+idDuMassifSelectionne+'")');
	//tx.executeSql('SELECT * from Pays p where "%"+p.Oid+"%" like (SELECT LesPaysId from Massif where Oid = "'+idDuMassifSelectionne+'")', [], traiterPaysDUnMassif, errorHandler);
	//alert('SELECT * from Pays p where INSTR(SELECT LesPaysId from Massif where Oid = "'+idDuMassifSelectionne+'",p.Oid)>0');
	//tx.executeSql('SELECT * from Pays p where INSTR(SELECT LesPaysId from Massif m where m.Oid = "'+idDuMassifSelectionne+'",p.Oid)>0', [], traiterPaysDUnMassif, errorHandler);
	*/
	db.transaction(
			function (tx) {
				tx.executeSql('SELECT LesPaysId from Massif m where m.Oid = "'+idDuMassifSelectionne+'"', [], traiterPaysDUnMassif, errorHandler);
			}, errorHandler);
}

//Query the database
//recuperation du massif qui correspond à une station selectionné
function queryMassifDUneStation(idDeLaStationSelectionnee) {
	//tx.executeSql('SELECT m.MassifId, m.Oid, m.Nom, m.Statut, m.LesPaysID, m.Description from Station s, Massif m where s.MassifId = m.Oid and s.Oid = "'+idDeLaStationSelectionnee+'"', [], traiterMassifDUneStation, errorHandler);
	db.transaction(
			function (tx) {
				tx.executeSql('SELECT m.MassifId, m.Oid, m.Nom, m.Statut, m.LesPaysID, m.Description from Station s, Massif m where s.MassifId = m.Oid and s.Oid = "'+idDeLaStationSelectionnee+'"', [], traiterMassifDUneStation, errorHandler);
			}, errorHandler);
}

//Query the database
//recuperation de tous les pays stockes sur le telephone
//si select OK callback vers la fonction affichage dans la page 
function queryPaysAll(tx) {
	tx.executeSql('SELECT * from Pays' , [], traiterLesPays, errorHandler);
}

//Query the database
//recuperation de tous les massifs stockes sur le telephone
//si select OK callback vers la fonction affichage dans la page 
function queryMassifAll(tx) {
	tx.executeSql('SELECT * from Massif' , [], traiterLesMassifs, errorHandler);
}

//Query the database
//recuperation de tous les massifs stockees sur le telephone
//si select OK callback vers la fonction affichage dans la page 
function queryStationAll(tx) {
	tx.executeSql('SELECT * from Station' , [], traiterLesStations, errorHandler);
}

//Query the database
//recuperation de toutes les couleurs stockees sur le telephone
//si select OK callback vers la fonction affichage dans la page 
function queryCouleurAll(tx) {
	tx.executeSql('SELECT * from Couleur', [], traiterLesCouleurs, errorHandler);
}

function traiterLesPays(tx,result){
	var lesPays = new Array(result.rows.length);
	if (result != null ) {
		for (i = 0; i < result.rows.length; i++) {
			lesPays[i] = new Pays(
					result.rows.item(i).PaysId,
					result.rows.item(i).Oid,
					result.rows.item(i).Nom,
					result.rows.item(i).Statut);
		}


		afficherContenuListePays(lesPays);
	}
	else return;
}

function traiterLesMassifs(tx,result){
	var lesMassifs = new Array(result.rows.length);
	
	if (result != null ) {
		for (i = 0; i < result.rows.length; i++) {
			lesMassifs[i] = new Massif(
					result.rows.item(i).MassifId,
					result.rows.item(i).Oid,
					result.rows.item(i).Nom,
					result.rows.item(i).Statut,
					result.rows.item(i).LesPaysId,
					result.rows.item(i).Description);
		}
		afficherContenuListeMassif(lesMassifs);
	}
	else return;
}

function traiterPaysDUnMassif(tx,result){
	if (result != null ) {
		tx.executeSql('SELECT * from Pays where replace("'+result.rows.item(0).LesPaysId+'", Oid, "") != "'+result.rows.item(0).LesPaysId+'"', [], traiterPaysDUnMassif2, errorHandler);
	}
	else return;
}

function traiterPaysDUnMassif2(tx,result){
	if (result != null ) {
		// On prend que le premier pays trouvé..
		var p = new Pays(
				result.rows.item(0).PaysId,
				result.rows.item(0).Oid,
				result.rows.item(0).Nom,
				result.rows.item(0).Statut);
		afficherPaysDUnMassif(p);
	}
	else return;
}

function traiterMassifDUneStation(tx,result){
	if (result != null ) {
		var m = new Massif(
					result.rows.item(0).MassifId,
					result.rows.item(0).Oid,
					result.rows.item(0).Nom,
					result.rows.item(0).Statut,
					result.rows.item(0).LesPaysId,
					result.rows.item(0).Description);
		afficherMassifDUneStation(m);
	}
	else return;
}

function traiterLesStations(tx,result){
	var lesStations = new Array(result.rows.length);
	if (result != null ) {
		for (i = 0; i < result.rows.length; i++) {
			lesStations[i] = new Station(
					result.rows.item(i).StationId,
					result.rows.item(i).Oid,
					result.rows.item(i).Nom,
					result.rows.item(i).Lattidude,
					result.rows.item(i).Longitude,
					result.rows.item(i).Url,
					result.rows.item(i).Image,
					result.rows.item(i).CREAD,
					result.rows.item(i).MassifId,
					result.rows.item(i).Statut);
		}
		afficherContenuListeStation(lesStations);
	}
	else return;
}

function traiterLesCouleurs(tx,result){
	lesCouleurs = new Array(result.rows.length);
	if (result != null ) {
		for (i = 0; i < result.rows.length; i++) {
			lesCouleurs[i] = new Couleur(
					result.rows.item(i).CouleurId,
					result.rows.item(i).Oid,
					result.rows.item(i).Libelle,
					result.rows.item(i).Couleur);
		}
		afficherContenuListeCouleur(lesCouleurs);
	}
	else return;
}