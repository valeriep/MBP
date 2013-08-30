
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
				tx.executeSql('SELECT * from Massif where LesPaysId LIKE "%'+idDuPaysSelectionne+'%"', [], traiterLesMassifsDUnPays, errorHandler);
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

function traiterLesMassifsDUnPays(tx,result){
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
		afficherContenuListeMassifDUnPays(lesMassifs);
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

/**
 * 
 * @param newPiste (contient les valeurs � ins�r�es)
 * @param idPisteAModifier : c'est l'id d'une piste si on fait une modification
 */
function enregisterPiste(newPiste, idPisteAModifier){
	var nom = transformer1QuoteEn2(newPiste.nom);
	var description = transformer1QuoteEn2(newPiste.descr);
	// Recuperere la date actuelle
	var dateCread = new Date();
	var photo = newPiste.photo;
	if(photo == "") photo = "./images/pisteDefault.png"; 
	
	var insertOrUpdate;
	if(idPisteAModifier == null){		
		insertOrUpdate = 'INSERT INTO PISTE (' 	+
		'Cread, '								+
		'Nom, ' 								+
		'Descr, ' 								+
		'Statut, ' 								+
		'CouleurId, ' 							+
		'StationId, ' 							+
		'MassifId, ' 							+
		'PaysId, ' 								+
		'Photo, ' 								+
		'ProprietairePiste) ' 					+
		
		' VALUES ("'+dateCread+'", "'+nom+'", "'+description+'", 2,"'+newPiste.idCouleur+'", "'+newPiste.idStation+'", "'+newPiste.idMassif+'", "'+newPiste.idPays+'", "'+photo+'", 1)';
	}
	else {
		insertOrUpdate = 'UPDATE PISTE SET ' 		+
		'Nom = "'+nom+'", ' 						+
		'Descr =  "'+description+'", ' 				+
		'CouleurId = "'+newPiste.idCouleur+'", ' 	+
		'StationId = "'+newPiste.idStation+'", ' 	+
		'MassifId = "'+newPiste.idMassif+'", ' 		+
		'PaysId = "'+newPiste.idPays+'", ' 			+
		'Photo = "'+photo+'" '						+
		'WHERE PisteId = "'+idPisteAModifier+'"';
	}
	
	//var insertParam = ['"'+dateCread+'"', '"'+nom+'"', '"'+description+'"', 2,'"'+newPiste.idCouleur+'"', '"'+newPiste.idStation+'"', '"'+newPiste.idMassif+'"', '"'+newPiste.idPays+'"', '"'+newPiste.photo+'"']; 
	/*
	for (i = 0; i < insertParam.length; i++) {
		alert(insertParam[i]);
	}
	*/
	db.transaction(
			function(tx) {
				tx.executeSql(insertOrUpdate,[],
							function(tx, results){
								// Enregistrement des mots cles dans la table MOTS_CLES_PISTE
								// Deja il faut supprimer les espaces s'il y'en a plusieurs
								var motsClesAvecUnSeulEspace = transformerPlusieursEspacesEnUnSeul(newPiste.motsCles);
								// et ensuite separer chaque mot dans un tableau
								var tablMotsCles = motsClesAvecUnSeulEspace.split(" ");
								// puis enregistrer le tableau dana la base donn�e
								if(idPisteAModifier == null){
									enregistrerMotsClesDunePiste(tablMotsCles, results.insertId);	
								}
								else
								{
									// On supprimer les anciens mots cl�s..
									supprimerMotsClesDunePiste(idPisteAModifier);
									
									// Attendre que la suppression soit effectu�e
									setTimeout(function(){
										// puis on ajoute les nouveaux mots cl�s
										enregistrerMotsClesDunePiste(tablMotsCles, idPisteAModifier);
									}, 1000);								
								}
								
							},errorHandler);
			}, errorHandler);
}

function enregistrerMotsClesDunePiste(tablMotsCles, idPiste){
	$.each(tablMotsCles, function(i, mot){
		insererMotCle(mot);
	});

	function insererMotCle(mot){
		var insert = 'INSERT INTO MOTS_CLES_PISTE (' +
		'PisteID,'		 	+
		'Nom)' 			 	+
		' VALUES ( ' 	 	+
		'"'+idPiste+'",' 	+
		'"'+transformer1QuoteEn2(mot)+'")';
		
		db.transaction(function(tx) {
			tx.executeSql(insert),[],successCallBack,errorHandler
		}, errorHandler);
	}		
}


function supprimerMotsClesDunePiste(idPiste){
		var sup = 'DELETE FROM MOTS_CLES_PISTE WHERE PisteID = "'+idPiste+'"'; 
		
		db.transaction(function(tx) {
			tx.executeSql(sup),[],successCallBack,errorHandler
		}, errorHandler);
}


function recupererMotsCles(idPiste){
	db.transaction(
			function (tx) {
				tx.executeSql('SELECT * from MOTS_CLES_PISTE where PisteID = "'+idPiste+'"', [], traiterLesMotsCles, errorHandler);
			}, errorHandler);
}

function traiterLesMotsCles(tx,result){
	var lesMotsCles = "";
	if (result != null ) {
		for (i = 0; i < result.rows.length; i++) {
			lesMotsCles += result.rows.item(i).Nom + " ";	
		}
	}
	remplirChampMotsCles(lesMotsCles);
}


function recupererDetailNouvellePiste(idPiste) {
	db.transaction(
			function (tx) { 
				tx.executeSql('SELECT p.*, c.*, s.nom as "nom_station", m.nom as "nom_massif", '+
							'pa.nom as "nom_pays" '+
							'FROM Piste p '+
							'left join Couleur c on p.CouleurId = c.Oid '+
							'inner join Pays pa on p.PaysId = pa.Oid '+
							'inner join Station s on p.StationId = s.Oid '+
							'inner join Massif m on s.MassifId = m.Oid '+
							'WHERE PisteId = "'+idPiste+'";', [], detailNouvellePisteSuccess, errorHandler);
			}, errorHandler);
}

function detailNouvellePisteSuccess(tx, result) {
	if (result != null && result.rows != null) {
			var pisteAModifier = new Piste(result.rows.item(0).PisteId, result.rows.item(0).Oid, result.rows.item(0).Cread,
				result.rows.item(0).Nom, result.rows.item(0).Descr, result.rows.item(0).Deniv, result.rows.item(0).AltDep,
				result.rows.item(0).AltArriv, result.rows.item(0).Lattitude, result.rows.item(0).Longitude, result.rows.item(0).Statut,
				result.rows.item(0).NotGlob, result.rows.item(0).NotGlobDiff, result.rows.item(0).NotGlobPan, result.rows.item(0).NotGlobEnsol,
				result.rows.item(0).NotGlobQual, result.rows.item(0).NotGlobPent, result.rows.item(0).NotGlobDist,
				result.rows.item(0).Couleur, result.rows.item(0).nom_station, result.rows.item(0).nom_massif, result.rows.item(0).nom_pays, result.rows.item(0).Photo);
			
			afficherContenueNouvellePiste(pisteAModifier);
	}
}
