//global variables
var db;
var shortName = 'MyBestPisteDB';
var version = '1.0';
var displayName = 'MyBestPisteDB';
var maxSize = 200000;
var listPist;
var listCouleurs;
var lesPistes;
var lesStations;
var pisteSelectionne;
var idPiste;
var nomPiste;
var pathImage;
var nombre_de_piste_total;
var nombre_de_piste;

//this line tries to open the database base locally on the device
//if it does not exist, it will create it and return a database
db = openDatabase(shortName, version, displayName,maxSize);

function initbdd(listPistSeolan, listCouleursSeolan, listStationsSeolan, listMassifsSeolan){
	if (!window.openDatabase) {
		// not all mobile devices support databases  if it does not, the
		// indicating the device will not be albe to run this application
		alert('Databases are not supported in this browser.');
		return;
	}

	// supprimer les tables s'ils existent
	db.transaction(dropCouleur ,nullHandler,nullHandler);
	db.transaction(dropPiste ,nullHandler,nullHandler);
	db.transaction(dropStation ,nullHandler,nullHandler);
	db.transaction(dropMassif ,nullHandler,nullHandler);

	// créer les tables s'ils n'existent pas
	db.transaction(createCouleur,errorHandler,successCallBack);
	db.transaction(createStation,errorHandler,successCallBack);
	db.transaction(createMassif,errorHandler,successCallBack);
	db.transaction(createPiste,errorHandler,successCallBack);

	// chargement des tables à partir du resultat du fichier json
	listCouleurs = listCouleursSeolan;
	listPist = listPistSeolan;
	listStations = listStationsSeolan;
	stockageCouleur();
	stockageMassif();
	stockageStation();
	stockagePiste();

}

function recupererDetailPiste(id) {
	idPiste = id;
	db.transaction(detailPiste, errorHandler);
}

function detailPiste(tx) {
	tx.executeSql('SELECT p.*, c.*, s.nom as "nom_station", m.nom as "nom_massif" FROM ,massif m, Piste p, Couleur c, Station s WHERE p.CouleurId = c.oid and p.StationId = s.oid and PisteId = "'+idPiste+'";', [], detailPisteSuccess, errorHandler);
}

function detailPisteSuccess(tx, result) {
	// resultats contient les reponses a la requete
	var len = result.rows.length;

	alert(result.rows.item(0).nom_station);
	if (result != null && result.rows != null) {
		pisteSelectionne = new Piste(result.rows.item(0).PisteId, result.rows.item(0).Oid, result.rows.item(0).Cread,
				result.rows.item(0).Nom, result.rows.item(0).Descr, result.rows.item(0).Deniv, result.rows.item(0).AltDep,
				result.rows.item(0).AltArriv,	result.rows.item(0).Lattitude, result.rows.item(0).Longitude, result.rows.item(0).MotCle, result.rows.item(0).Statut,
				result.rows.item(0).NotGlob, result.rows.item(0).NotGlobDiff, result.rows.item(0).NotGlobPan, result.rows.item(0).NotGlobEnsol,
				result.rows.item(0).NotGlobQual, result.rows.item(0).NotGlobPent, result.rows.item(0).NotGlobDist,
				result.rows.item(0).Couleur, result.rows.item(0).nom_station, result.rows.item(0).nom_massif, result.rows.item(0).Photo);

		return true;
	}
	else return false;
}

function getPisteSelectionnee(){
	return pisteSelectionne;
}

function listPistAll(){
//	select de toutes les pistes présentes en bdd 
	//db = openDatabase(shortName, version, displayName,maxSize);

	db.transaction(queryPisteAll,errorHandler );
}

//suppression de la base de donnee MybestPiste pour en creer ensuite une nouvelle
function dropCouleur(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS COULEUR'); 
}

function dropPiste(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS PISTE'); 
}

function dropStation(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS STATION'); 
}

function dropMassif(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS MASSIF'); 
}
//Creation de la table Couleur
function createCouleur(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Couleur( ' +
			'couleurId INTEGER NOT	NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'Libelle TEXT, ' +
	'Couleur TEXT)');
}

//Creation de la table Couleur
function createMassif(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS MASSIF( ' +
			'massifId INTEGER NOT	NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'nom TEXT, ' +
			'statut TEXT, ' +
	'description TEXT)');
}

//Creation de la table PISTE
function createPiste(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Piste( ' +
			'PisteId INTEGER NOT	NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'Cread TEXT , ' +
			'Nom TEXT, ' +
			'Descr TEXT, ' +
			'Deniv TEXT, ' +
			'AltDep INTEGER, ' +
			'AltArriv INTEGER, ' +
			'Latitude TEXT, ' +
			'Longitude TEXT, ' +
			'MotCle TEXT, ' +
			'Statut INTEGER, ' +
			'NotGlob REAL, ' +
			'NotGlobDiff REAL, ' +
			'NotGlobPan REAL, ' +
			'NotGlobEnsol REAL, ' +
			'NotGlobQual REAL, ' +
			'NotGlobPent REAL, ' +
			'NotGlobDist REAL, ' +
			'CouleurID REAL, ' +
			'StationID TEXT, ' +
			'Massif TEXT, ' +
	'Photo TEXT)');
}

//Creation de la table Station
function createStation(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Station( ' +
			'StationId INTEGER NOT	NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'Nom TEXT , ' +
			'Lattidude TEXT, ' +
			'Longitude TEXT, ' +
			'Url TEXT, ' +
			'Image TEXT, ' +
			'CREAD TEXT, ' +
			'MassifId TEXT, ' +
	'Statut TEXT)');
}

//Insertion des couleurs recuperées de SEOLAN listPist est la liste des pistes
function stockageCouleur() {	

	$.each(listCouleurs, function(i, couleur){
		insert(couleur);
	});

	function insert(coul){
		// insertion de la couleur
		var insert = 'INSERT INTO COULEUR (' +
		'Oid,'			+
		'Libelle, '		+
		'Couleur)' 		+
		' VALUES ( ' 	+
		'"'+coul.oid+'",'			+
		'"'+coul.libelle+'",'		+
		'"'+coul.couleur+'")';

		//alert("insert  " + insert);
		db.transaction(function(tx) {
			tx.executeSql(insert),[],successCallBack,errorHandler
		}, errorHandler);
	}
}		

//Insertion des couleurs recuperées de SEOLAN listPist est la liste des pistes
function stockageMassif() {	

	$.each(listMassifs, function(i, massif){
		insert(massif);
	});
}
function insert(massif){
	// insertion de la couleur
	var insert = 'INSERT INTO MASSIF (' +
	'Oid,'			+
	'nom, '		+
	'statut, '		+
	'description)' 		+
	' VALUES ( ' 	+
	'"'+massif.oid+'",'			+
	'"'+massif.nom+'",'		+
	'"'+massif.statut+'",'		+
	'"'+massif.description+'")';

	//alert("insert  " + insert);
	db.transaction(function(tx) {
		tx.executeSql(insert),[],successCallBack,errorHandler
	}, errorHandler);
}


//Insertion des pistes recupere de SEOLAN listPist est la liste des pistes
function stockagePiste() {	
	nombre_de_piste_total = listPist.length;
	nombre_de_piste = nombre_de_piste_total;
	//alert("Le nombre de piste total = "+ nombre_de_piste);

	suivant();
	function suivant(){
		var piste = listPist[nombre_de_piste_total - nombre_de_piste];

		//alert("alooooooo"+piste.oid);
		if (piste.F0001 != false) {
			var thefileUrl = downloadFile(piste);
			insertPiste(piste, thefileUrl);
		}
		else {
			pathImage = "./images/pisteDefault.png";
			insertPiste(piste,pathImage);
		}

		nombre_de_piste --;

		if(nombre_de_piste != 0){
			suivant();
		}
	}		
}

//Insertion des couleurs recuperées de SEOLAN listPist est la liste des pistes
function stockageStation() {	

	$.each(listStations, function(i, station){
		insert(station);
	});

	function insert(stat){
		// insertion de la couleur
		var insert = 'INSERT INTO STATION (' +
		'Oid,'					+
		'Nom, '					+
		'Lattidude, '			+
		'Longitude, '			+
		'Url, '					+
		'Image, '				+
		'CREAD, '				+
		'MassifId,' 			+
		'Statut)' 				+
		' VALUES ( ' 			+
		'"'+stat.oid+'",'		+
		'"'+stat.nom+'",'		+
		'"'+stat.lattidude+'",'	+
		'"'+stat.longitude+'",'	+
		'"'+stat.url+'",'		+
		'"'+stat.image+'",'		+
		'"'+stat.cread+'",'		+
		'"'+stat.massifId+'",'	+
		'"'+stat.statut+'")';

		//alert("insert  " + insert);
		db.transaction(function(tx) {
			tx.executeSql(insert),[],successCallBack,errorHandler
		}, errorHandler);
	}
}		

function insertPiste(piste,pathImage){

	//alert("retour stockage : " + pathImage);
	// insertion de la piste
	var insert = 'INSERT INTO PISTE (' +
	'oid,'			+
	'Cread, '		+
	'Nom,' 			+
	'Descr,' 		+
	'Deniv,' 		+
	'AltDep,' 		+
	'AltArriv,' 	+
	'Latitude,' 	+
	'Longitude ,' 	+
	'MotCle ,' 		+
	'Statut , ' 	+
	'NotGlob,	' 	+
	'NotGlobDiff ,' +
	'NotGlobPan , ' +
	'NotGlobEnsol , ' +
	'NotGlobQual ,' +
	'NotGlobPent ,' +
	'NotGlobDist ,' +
	'CouleurId , ' 	+
	'StationID , ' +
	'Massif , ' +
	'Photo ) ' 		+

	' VALUES ( ' 	+

	'"'+piste.oid+'",'			+
	'"'+piste.CREAD+'",'		+
	'"'+piste.nom+'",'			+
	'"'+piste.descr+'",'		+
	'"'+piste.deniv+'",'		+
	parseInt(piste.altDep)+','		+
	parseInt(piste.altArriv)+','	+
	'"'+piste.latitude+'",'				+
	'"'+piste.longitude+'",'			+
	'"'+piste.motCle+'",'				+
	parseInt(piste.Statut)+','		+
	parseFloat(piste.notGlob)+','		+
	parseFloat(piste.NotGlobDiff)+','	+
	parseFloat(piste.notGlobPan)+','	+
	parseFloat(piste.notGlobEnsol)+','	+
	parseFloat(piste.notGlobQual)+','	+
	parseFloat(piste.notGlobPent)+','	+
	parseFloat(piste.notGlobDist)+','	+
	'"'+piste.couleurId+'",'			+
	'"'+piste.refStation+'",'			+
	'"'+piste.refMassif+'",'			+
	'"' + pathImage + '")';

	//alert("insert  " + insert);
	db.transaction(function(tx) {
		tx.executeSql(insert),[],successCallBack,errorHandler
	}, errorHandler);
//	alert(insert);	 	
}

//Query the database
//recuperation de toutes les pistes stockees sur le telephone
//si select OK callback vers la fonction affichage dans la page 
function queryPisteAll(tx) {
	//alert("recup les pistes");
	tx.executeSql('SELECT * from Piste p, Couleur c, Station s WHERE p.CouleurId = c.oid and p.StationId = s.oid' , [], traiterLesPiste, errorHandler);

}

function traiterLesPiste(tx,result){

	var lesPistes = new Array(result.rows.length);

	if (result != null ) {
		for (i = 0; i < result.rows.length; i++) {
			lesPistes[i] = new PisteList(result.rows.item(i).PisteId ,
					result.rows.item(i).Nom, 
					result.rows.item(i).NotGlob,
					result.rows.item(i).Couleur,
					result.rows.item(i).Photo);
		}
		AfficherListePiste(lesPistes);
	}
	else{return;}

}

function queryError(tx, err) {

	alert("Erreur de traitement SQL : "+ err.code);
}


//this is called when an error happens in a transaction
function errorHandler(transaction, error) {
	alert('Error: erreur sql' +  error );

}

//this is called when a successful transaction happens
function successCallBack() {
	//alert("DEBUGGING: success");

}

function nullHandler(){

}
