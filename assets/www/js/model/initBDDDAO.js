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

//this line tries to open the database base locally on the device
//if it does not exist, it will create it and return a database
db = openDatabase(shortName, version, displayName, maxSize);

/* Cette fonction permet de créer une variable dans le localStorage "runned",
 *  (c'est dans le cas où c'est la premiere fois qu'on demarre l'application)
 */
function premiereCreationBDD(){
	window.localStorage["runnded"] = "1";
}

/* Cette fonction permet de tester si la base de donnée existe deja
 * @return : true si la base existe deja; false sinon 
 */
function bDDExiste(){
	var firstrun = window.localStorage["runnded"];
	if ( firstrun == null ) 
		return false
	else 
		return true;
}

function initbdd(listPistSeolan, listCouleursSeolan, listStationsSeolan, listMassifsSeolan, listPaysSeolan){
	if (!window.openDatabase) {
		// not all mobile devices support databases  if it does not, the
		// indicating the device will not be albe to run this application
		navigator.notification.alert('Databases are not supported in this browser.');
		return;
	}
	
	// Si la base de données n'est pas dejà crée
	//if(bDDExiste()== false)
	//{
		// supprimer les tables s'ils existent

		// TODO : il faut juste avant de supprimer les tables, envoyer les
		// information qui ont le statut = 2 (c a d les informations qu'ils faut les validés par l'administrateur)
		db.transaction(dropPiste, errCreationSupp, successCreationSupp);
		db.transaction(dropCouleur, errCreationSupp, successCreationSupp);
		db.transaction(dropStation, errCreationSupp, successCreationSupp);
		db.transaction(dropMassif, errCreationSupp, successCreationSupp);
		db.transaction(dropPays, errCreationSupp, successCreationSupp);
		db.transaction(dropMotsClesPiste,errCreationSupp, successCreationSupp);

		// créer les tables s'ils n'existent pas
		db.transaction(createPiste, errCreationSupp, successCreationSupp);
		db.transaction(createCouleur, errCreationSupp, successCreationSupp);
		db.transaction(createStation, errCreationSupp, successCreationSupp);
		db.transaction(createMassif, errCreationSupp, successCreationSupp);
		db.transaction(createPays, errCreationSupp, successCreationSupp);
		db.transaction(createMotsClesPiste, errCreationSupp, successCreationSupp);
	//}

	// chargement des tables ÃƒÂ  partir du resultat du fichier json
	listCouleurs = listCouleursSeolan;
	listStations = listStationsSeolan;
	listMassifs = listMassifsSeolan;
	listPays = listPaysSeolan;
	stockageCouleur();
	stockageMassif();
	stockageStation();
	stockagePays();
	stockagePiste(listPistSeolan, 0); 
}

/** suppression de la base de donnee MybestPiste pour en creer ensuite une nouvelle **/
function dropPiste(tx) {
	// TODO : N'oublier pas de remonter les pistes dont le statut=2 
	//(c'est a dire les pistes non validées par l'admin et qui peuvent avoir été modifié)à la console
	
	tx.executeSql( 'DELETE FROM PISTE WHERE Statut = 1');
	
	//tx.executeSql( 'DROP TABLE IF EXISTS PISTE'); 
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
	tx.executeSql( 'DELETE FROM MOTS_CLES_PISTE WHERE PisteID NOT IN (SELECT PisteID FROM PISTE WHERE Statut = 2)'); 
}

/** Création des tables de la base de données **/
function createPiste(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Piste( ' 	+
			'PisteId INTEGER NOT NULL PRIMARY KEY, ' 		+
			'Oid TEXT , ' 									+
			'Cread TEXT , ' 								+
			'Nom TEXT, ' 									+
			'Descr TEXT, ' 									+
			'Deniv TEXT, ' 									+
			'AltDep INTEGER, ' 								+
			'AltArriv INTEGER, '						 	+
			'Latitude TEXT, ' 								+
			'Longitude TEXT, ' 								+
			'Statut INTEGER, ' 								+
			'NotGlob REAL, ' 								+
			'NotGlobDiff REAL, ' 							+
			'NotGlobPan REAL, ' 							+
			'NotGlobEnsol REAL, ' 							+
			'NotGlobQual REAL, ' 							+
			'NotGlobPent REAL, ' 							+
			'NotGlobDist REAL, ' 							+
			'CouleurID TEXT, ' 								+
			'StationID TEXT, ' 								+
			'MassifID TEXT, ' 								+
			'PaysID TEXT, ' 								+
			'Photo TEXT, '	 								+
			'ProprietairePiste INTEGER)');					// ProprietairePiste: booleen : 0 ou 1 (1 si l'utilisateur est propriétaire de cette piste)
}

function createCouleur(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Couleur( ' 		+
			'CouleurId INTEGER NOT	NULL PRIMARY KEY, ' 		+
			'Oid TEXT , ' 										+
			'Libelle TEXT, ' 									+
			'Couleur TEXT)');
}

function createPays(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Pays( ' 			+
			'PaysId INTEGER NOT	NULL PRIMARY KEY, ' 			+
			'Oid TEXT , ' 										+
			'Nom TEXT, ' 										+
			'Statut TEXT)');
}

function createMassif(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS MASSIF( ' 		+
			'MassifId INTEGER NOT NULL PRIMARY KEY, ' 			+
			'Oid TEXT , ' 										+
			'Nom TEXT, ' 										+
			'Statut TEXT, ' 									+
			'LesPaysId TEXT, ' 									+ 
			'Description TEXT)');
}


function createStation(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Station( ' 		+
			'StationId INTEGER NOT NULL PRIMARY KEY, ' 			+
			'Oid TEXT , ' 										+
			'Nom TEXT , ' 										+
			'Lattidude TEXT, ' 									+
			'Longitude TEXT, ' 									+
			'Url TEXT, ' 										+
			'Image TEXT, ' 										+
			'CREAD TEXT, ' 										+
			'MassifId TEXT, ' 									+
			'Statut TEXT)');
}

function createMotsClesPiste(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS MOTS_CLES_PISTE( '	+
			'MotsClesPisteId INTEGER NOT NULL PRIMARY KEY, ' 		+
			'PisteID TEXT , ' 										+
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
		var select = 'SELECT count(*) AS "c" FROM COULEUR '+
					 'WHERE Oid = "'+coul.oid+'"'
					 'and Libelle = "'+coul.libelle+'" '+
					 'and Couleur = "'+coul.couleur+'"';
		
					 
		db.transaction(function(tx) {
			tx.executeSql(select, [], suppAndInsertIfNotExist, errorHandler);
		}, errorHandler);		
		
		function suppAndInsertIfNotExist(tx,result){
			if(result.rows.item(0).c == 0){
				
				var sup = 'DELETE FROM COULEUR '+
						 'WHERE Oid = "'+coul.oid+'"'
						 'OR Libelle = "'+coul.libelle+'" '+
						 'OR Couleur = "'+coul.couleur+'"';
	
				db.transaction(function(tx) {
					tx.executeSql(sup, [], insererANouveau, errorHandler);
				}, errorHandler);
				
				function insererANouveau(){
					// insertion de la couleur
					var insert = 'INSERT INTO COULEUR (' 	+
					'Oid,'									+
					'Libelle, '								+
					'Couleur)' 								+
					' VALUES ( ' 							+
					'"'+coul.oid+'",'						+
					'"'+coul.libelle+'",'					+
					'"'+coul.couleur+'")';
					
					db.transaction(function(tx) {
						tx.executeSql(insert,[],successCallBack,errorHandler);
					}, errorHandler);
				}
			}
		}
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
		var insert = 'INSERT INTO MASSIF (' 	+
		'Oid,'									+
		'Nom, '									+
		'Statut, '								+
		'LesPaysId ,'   						+
		'Description)' 							+
		' VALUES ( ' 							+
		'"'+massif.oid+'",'						+
		'"'+massif.nom+'",'						+
		'"'+massif.statut+'",'					+
		'"'+massif.refPays+ '",'				+
		'"'+massif.description+'")';
		
		db.transaction(function(tx) {
			tx.executeSql(insert,[],successCallBack,errorHandler);
		}, errorHandler);
	}
}

function stockagePays() {
	$.each(listPays, function(i, pays){
		if(pays.statut == 1){
			insert(pays);	
		}
	});

	function insert(pays){
		var insert = 'INSERT INTO PAYS (' 	+
		'Oid,'								+
		'Nom, '								+
		'Statut )' 							+
		' VALUES ( ' 						+
		'"'+pays.oid+'",'					+
		'"'+pays.nom+'",'					+
		'"'+pays.statut+'")';
	
		db.transaction(function(tx) {
			tx.executeSql(insert,[],successCallBack,errorHandler);
		}, errorHandler);
	}
}

/*Insertion des pistes recupere de SEOLAN 
 * @param : listPist: est la liste des pistes
 * @param : proprietairePiste: est un boolean (0: false; 1; true) pour savoir si l'utilisateur est proprietaire de la liste des pistes
 */
function stockagePiste(listPist, proprietairePiste) {
	var nombre_de_piste_total = listPist.length;
	var nombre_de_piste = nombre_de_piste_total;
	
	suivant();
	function suivant(){
		var piste = listPist[nombre_de_piste_total - nombre_de_piste];
		
		// Si la piste est validé par l'administrateur
		// TODO : il faut rendre changer la fonction php de séolan pour qu'elle rende que les piste dont les statuts = 1
		if(piste.Statut == 1)
		{
			if (piste.F0001 != false) {
				downloadFile(piste, proprietairePiste);
			}
			else {
				var pathImage = "./images/pisteDefault.png";
				insertPiste(piste, proprietairePiste, pathImage);
			}
		}
		
		nombre_de_piste --;

		if(nombre_de_piste != 0){
			suivant();
		}	
	}
}

function stockageStation() {

	$.each(listStations, function(i, station){
		if(station.statut == 1){
			insert(station);
		}
	});

	function insert(stat){
		var insert = 'INSERT INTO STATION (' 	+
		'Oid,'									+
		'Nom, '									+
		'Lattidude, '							+
		'Longitude, '							+
		'Url, '									+
		'Image, '								+
		'CREAD, '								+
		'MassifId,' 							+
		'Statut)' 								+
		' VALUES ( ' 							+
		'"'+stat.oid+'",'						+
		'"'+stat.nom+'",'						+
		'"'+stat.lattidude+'",'					+
		'"'+stat.longitude+'",'					+
		'"'+stat.url+'",'						+
		'"'+stat.image+'",'						+
		'"'+stat.cread+'",'						+
		'"'+stat.massifId+'",'					+
		'"'+stat.statut+'")';

		db.transaction(function(tx) {
			tx.executeSql(insert,[],successCallBack,errorHandler);
		}, errorHandler);
	}
}

function insertPiste(piste, proprietairePiste, pathImage){
	// insertion de la piste
	var nom = transformer1QuoteEn2(piste.nom);
	var description = transformer1QuoteEn2(piste.descr);
	
	if(proprietairePiste == 1){
		// Si l'utilisateur est authentifié, on va inserer sa piste si elle n'existe pas déjà dans la base de donnée
		// et la remplacer si elle elle existe dejà (car le champ ProprietairePiste va être modifié après l'insertion)
		var select = 'SELECT * FROM PISTE WHERE Oid = "'+piste.oid+'"';
		db.transaction(function(tx) {
			tx.executeSql(select, [], insererOuMAJ, errorHandler),[],successCallBack,errorHandler;
		}, errorHandler);
		
		function insererOuMAJ(tx,result){
			if(result.rows.length != 0){
				insert = 'UPDATE PISTE SET ProprietairePiste = '+proprietairePiste+' WHERE Oid = "'+piste.oid+'"';
			}
		}
	}
	else
	{
		var insert = 'INSERT INTO PISTE (' 		+
		'Oid,'									+
		'Cread, '								+
		'Nom, ' 								+
		'Descr, ' 								+
		'Deniv, ' 								+
		'AltDep, ' 								+
		'AltArriv, ' 							+
		'Latitude, ' 							+
		'Longitude, ' 							+
		'Statut, ' 								+
		'NotGlob, ' 							+
		'NotGlobDiff, '							+
		'NotGlobPan, ' 							+
		'NotGlobEnsol, '						+
		'NotGlobQual, '							+
		'NotGlobPent, '							+
		'NotGlobDist, '							+
		'CouleurId, ' 							+
		'StationId, ' 							+
		'MassifId, ' 							+
		'PaysId, ' 								+
		'Photo, ' 								+
		'ProprietairePiste ) ' 					+
		
		' VALUES ( ' 							+
		
		'"'+piste.oid+'",'						+
		'"'+piste.CREAD+'",'					+
		'"'+nom+'",'							+
		'"'+description+'",'					+
		'"'+piste.deniv+'",'					+
		parseInt(piste.altDep)+','				+
		parseInt(piste.altArriv)+','			+
		'"'+piste.latitude+'",'					+
		'"'+piste.longitude+'",'				+
		parseInt(piste.Statut)+','				+
		parseFloat(piste.notGlob)+','			+
		parseFloat(piste.NotGlobDiff)+','		+
		parseFloat(piste.notGlobPan)+','		+
		parseFloat(piste.notGlobEnsol)+','		+
		parseFloat(piste.notGlobQual)+','		+
		parseFloat(piste.notGlobPent)+','		+
		parseFloat(piste.notGlobDist)+','		+
		'"'+piste.couleurId+'",'				+
		'"'+piste.refStation+'",'				+
		'"'+piste.refMassif+'",'				+
		'"'+piste.refPays+'",'					+
		'"'+pathImage+'",'						+
		proprietairePiste + ')';
	}
	
	db.transaction(function(tx) {
		tx.executeSql(insert,[],
			function(){
			// Si la page courante est "mesPistesPages"
			 if($.mobile.activePage.attr('id')=="mesPistesPage"){
				 afficherMesPistes();
			 }
			 else
				 // Si la page courante est la liste de toutes les pistes
				 if($.mobile.activePage.attr('id')=="accueilListe"){
					 afficherLesPistes();
				 }
		},errorHandler);
	}, errorHandler);
}