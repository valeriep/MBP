//global variables
var db;
var shortName = 'MyBestPisteDB';
var version = '1.0';
var displayName = 'MyBestPisteDB';
var maxSize = 200000;

var listCouleurs;
var listPays;
var listMassifs;
var listStations;

var nouvelleVersion; // booleen (true s'il y a une nouvelle version) (false sinon)

//this line tries to open the database base locally on the device
//if it does not exist, it will create it and return a database

// TODO ... (si ce n'est pas la même version, on crée une base de donnée avec une nouvelle version..) 


db = openDatabase(shortName, version, displayName,maxSize);

function initbdd(listPistSeolan, listCouleursSeolan, listStationsSeolan, listMassifsSeolan, listPaysSeolan){
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
	db.transaction(dropPays ,nullHandler,nullHandler);

	// crÃƒÂ©er les tables s'ils n'existent pas
	db.transaction(createCouleur,errorHandler,successCallBack);
	db.transaction(createStation,errorHandler,successCallBack);
	db.transaction(createMassif,errorHandler,successCallBack);
	db.transaction(createPays,errorHandler,successCallBack);
	db.transaction(createPiste,errorHandler,successCallBack);
	db.transaction(createMotsClesPiste,errorHandler,successCallBack);

	// chargement des tables ÃƒÂ  partir du resultat du fichier json
	listCouleurs = listCouleursSeolan;
	listPist = listPistSeolan;
	listStations = listStationsSeolan;
	listMassifs = listMassifsSeolan;
	listPays = listPaysSeolan;
	stockageCouleur();
	stockageMassif();
	stockageStation();
	stockagePays();
	stockagePiste();
}

/** suppression de la base de donnee MybestPiste pour en creer ensuite une nouvelle **/
function dropPiste(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS PISTE'); 
}

function dropCouleur(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS COULEUR'); 
}

function dropPays(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS PAYS'); 
}


function dropStation(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS STATION'); 
}

function dropMassif(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS MASSIF'); 
}

function dropMotsClesPiste(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS MOTS_CLES_PISTE'); 
}

/** Création des tables de la base de données **/
function createPiste(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Piste( ' +
			'PisteId INTEGER NOT NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'Cread TEXT , ' +
			'Nom TEXT, ' +
			'Descr TEXT, ' +
			'Deniv TEXT, ' +
			'AltDep INTEGER, ' +
			'AltArriv INTEGER, ' +
			'Latitude TEXT, ' +
			'Longitude TEXT, ' +
			'Statut INTEGER, ' +
			'NotGlob REAL, ' +
			'NotGlobDiff REAL, ' +
			'NotGlobPan REAL, ' +
			'NotGlobEnsol REAL, ' +
			'NotGlobQual REAL, ' +
			'NotGlobPent REAL, ' +
			'NotGlobDist REAL, ' +
			'CouleurID TEXT, ' +
			'StationID TEXT, ' +
			'MassifID TEXT, ' +
			'PaysID TEXT, ' +
			'Photo TEXT)');
}

function createCouleur(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Couleur( ' +
			'CouleurId INTEGER NOT	NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'Libelle TEXT, ' +
			'Couleur TEXT)');
}

function createPays(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Pays( ' +
			'PaysId INTEGER NOT	NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'Nom TEXT, ' +
			'Statut TEXT)');
}

function createMassif(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS MASSIF( ' +
			'MassifId INTEGER NOT NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'Nom TEXT, ' +
			'Statut TEXT, ' +
			'LesPaysId TEXT, ' + 
			'Description TEXT)');
}


function createStation(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Station( ' +
			'StationId INTEGER NOT NULL PRIMARY KEY, ' +
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

function createMotsClesPiste(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS MOTS_CLES_PISTE( ' +
			'MotsClesPisteId INTEGER NOT NULL PRIMARY KEY, ' +
			'PisteID TEXT , ' +
			'Nom TEXT)');
}

/* Stockage dans la base de donnée du téléphone */
//Insertion des couleurs recuperÃƒÂ©es de SEOLAN listPist est la liste des pistes
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
		
		db.transaction(function(tx) {
			tx.executeSql(insert),[],successCallBack,errorHandler
		}, errorHandler);
	}
}

//Insertion des couleurs recuperÃƒÂ©es de SEOLAN listPist est la liste des pistes
function stockageMassif() {
	$.each(listMassifs, function(i, massif){
		if(massif.statut == 1){
			insert(massif);	
		}
	});

	function insert(massif){
		// insertion de la couleur
		var insert = 'INSERT INTO MASSIF (' +
		'Oid,'			+
		'Nom, '		+
		'Statut, '		+
		'LesPaysId ,'   +
		'Description)' 		+
		' VALUES ( ' 	+
		'"'+massif.oid+'",'			+
		'"'+massif.nom+'",'		+
		'"'+massif.statut+'",'		+
		'"'+massif.refPays+ '",'		+
		'"'+massif.description+'")';
		
		db.transaction(function(tx) {
			tx.executeSql(insert),[],successCallBack,errorHandler
		}, errorHandler);
	}
}

//Insertion des couleurs recuperÃƒÂ©es de SEOLAN listPist est la liste des pistes
function stockagePays() {
	$.each(listPays, function(i, pays){
		if(pays.statut == 1){
			insert(pays);	
		}
	});

	function insert(pays){
		// insertion de la couleur
		var insert = 'INSERT INTO PAYS (' +
		'Oid,'			+
		'Nom, '		+
		'Statut )' 		+
		' VALUES ( ' 	+
		'"'+pays.oid+'",'			+
		'"'+pays.nom+'",'		+
		'"'+pays.statut+'")';
	
		db.transaction(function(tx) {
			tx.executeSql(insert),[],successCallBack,errorHandler
		}, errorHandler);
	}
}

//Insertion des pistes recupere de SEOLAN listPist est la liste des pistes
function stockagePiste() {
	var nombre_de_piste_total = listPist.length;
	var nombre_de_piste = nombre_de_piste_total;
	
	suivant();
	function suivant(){
		var piste = listPist[nombre_de_piste_total - nombre_de_piste];
		
		// Si la piste est validé par l'administrateur
		if(piste.Statut == 1)
		{
			if (piste.F0001 != false) {
				var thefileUrl = downloadFile(piste);
				insertPiste(piste, thefileUrl);
			}
			else {
				var pathImage = "./images/pisteDefault.png";
				insertPiste(piste,pathImage);
			}
		}
		
		nombre_de_piste --;

		if(nombre_de_piste != 0){
			suivant();
		}
	
	}
}

//Insertion des couleurs recuperÃƒÂ©es de SEOLAN listPist est la liste des pistes
function stockageStation() {

	$.each(listStations, function(i, station){
		if(station.statut == 1){
			insert(station);
		}
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

		db.transaction(function(tx) {
			tx.executeSql(insert),[],successCallBack,errorHandler
		}, errorHandler);
	}
}		

function insertPiste(piste,pathImage){

	// insertion de la piste
	var nom = transformer1QuoteEn2(piste.nom);
	var description = transformer1QuoteEn2(piste.descr);
	
	var insert = 'INSERT INTO PISTE (' +
	'Oid,'			+
	'Cread, '		+
	'Nom,' 			+
	'Descr,' 		+
	'Deniv,' 		+
	'AltDep,' 		+
	'AltArriv,' 	+
	'Latitude,' 	+
	'Longitude ,' 	+
	'Statut , ' 	+
	'NotGlob,	' 	+
	'NotGlobDiff ,' +
	'NotGlobPan , ' +
	'NotGlobEnsol , ' +
	'NotGlobQual ,' +
	'NotGlobPent ,' +
	'NotGlobDist ,' +
	'CouleurId , ' 	+
	'StationId , ' +
	'MassifId , ' +
	'PaysId , ' +
	'Photo ) ' 		+
	
	' VALUES ( ' 	+
	
	'"'+piste.oid+'",'			+
	'"'+piste.CREAD+'",'		+
	'"'+nom+'",'			+
	'"'+description+'",'		+
	'"'+piste.deniv+'",'		+
	parseInt(piste.altDep)+','		+
	parseInt(piste.altArriv)+','	+
	'"'+piste.latitude+'",'				+
	'"'+piste.longitude+'",'			+
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
	'"'+piste.refPays+'",'			+
	'"' + pathImage + '")';
	
	db.transaction(function(tx) {
		tx.executeSql(insert),[],successCallBack,errorHandler
	}, errorHandler);	
}