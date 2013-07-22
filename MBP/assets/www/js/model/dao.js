//global variables
var db;
var shortName = 'MyBestPisteDB';
var version = '1.0';
var displayName = 'MyBestPisteDB';
var maxSize = 200000;
var listPist;
var lesPistes;


function initbdd(listPistSeolan){
	if (!window.openDatabase) {
		// not all mobile devices support databases  if it does not, the
		// indicating the device will not be albe to run this application
		alert('Databases are not supported in this browser.');
		return;
	}

	// this line tries to open the database base locally on the device
	// if it does not exist, it will create it and return a database
	db = openDatabase(shortName, version, displayName,maxSize);
	// this line drop the table piste if exists
	db.transaction(dropPiste ,nullHandler,nullHandler);
	// this line create the table piste 
	db.transaction(createPiste,errorHandler,successCallBack);
	listPist = listPistSeolan;
	db.transaction(insertPiste,errorHandler,successCallBack );

}

function recupererDetailPiste(nom){
	if (!window.openDatabase) {
		// not all mobile devices support databases  if it does not, the
		// indicating the device will not be albe to run this application
		alert('Databases are not supported in this browser.');
		return;
	}

	var a = 'SELECT * FROM piste WHERE Nom = "'+nom+'";';
	alert(a);
	db.transaction(function(transaction) {
		transaction.executeSql(a, [],
				function(transaction, result) {
			if (result != null && result.rows != null) {
				alert("nombre des lignes selectionnées : " + result.rows.length);
				
				pisteSelectionne = new Piste(result.rows.item(0).PisteId, result.rows.item(0).Oid, result.rows.item(0).Cread,
						result.rows.item(0).Nom, result.rows.item(0).Descr, result.rows.item(0).Deniv, result.rows.item(0).AltDep,
						result.rows.item(0).altArriv,	result.rows.item(0).lattitude, result.rows.item(0).MotCle, result.rows.item(0).Statut,
						result.rows.item(0).NotGlob, result.rows.item(0).NotGlobDiff, result.rows.item(0).NotGlobPan,
						result.rows.item(0).NotGlobQual, result.rows.item(0).NotGlobPent, result.rows.item(0).NotGlobDist,
						result.rows.item(0).Couleur, result.rows.item(0).RefStation, result.rows.item(0).Photo);
				
				//alert("pisteSelectionne.nom"+pisteSelectionne.nom);
				return pisteSelectionne;
			}
		},errorHandler);
	},errorHandler,nullHandler);

	return;
}


function listPistAll(){
// select de toutes les pistes présentes en bdd 
	db = openDatabase(shortName, version, displayName,maxSize);
	alert("avant select");
	db.transaction(queryPisteAll,errorHandler );
}

// suppression de la base de donnee MybestPiste pour en creer ensuite une nouvelle
function dropPiste(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS PISTE'); 
}

// Creation de la table PISTE
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
			'latitude TEXT, ' +
			'longitude TEXT, ' +
			'MotCle TEXT, ' +
			'Statut INTEGER, ' +
			'NotGlob REAL, ' +
			'NotGlobDiff REAL, ' +
			'NotGlobPan REAL, ' +
			'NotGlobQual REAL, ' +
			'NotGlobPent REAL, ' +
			'NotGlobDist REAL, ' +
			'Couleur REAL, ' +
			'RefStation TEXT, ' +
			'Photo BLOB)');
}

//Insertion des pistes recupere de SEOLAN listPist est la liste des pistes
function insertPiste(tx) {

	$.each(listPist, function(index, piste) {
//		// Dans le cas ou pas image de piste sur le serveur
		var img = new Image();
		//recuperation de l image et non son url

		if (!piste.F0001){
			img.scr = "./images/pisteDefault.png";
		}
		else {
			img.src = domaine+ piste.F0001+ '&geometry=50x50%3E'; 
		}
		// insertion de la piste
		var insert = 'INSERT INTO PISTE (' +
		'oid,'			+
		'Cread, '		+
		'Nom,' 			+
		'Descr,' 		+
		'Deniv,' 		+
		'AltDep,' 		+
		'AltArriv,' 	+
		'latitude,' 	+
		'longitude ,' 	+
		'MotCle ,' 		+
		'Statut , ' 	+
		'NotGlob,	' 	+
		'NotGlobDiff ,' +
		'NotGlobPan , ' +
		'NotGlobQual ,' +
		'NotGlobPent ,' +
		'NotGlobDist ,' +
		'Couleur , ' 	+
		'RefStation , ' +
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
		parseFloat(piste.notGlobQual)+','	+
		parseFloat(piste.notGlobPent)+','	+
		parseFloat(piste.notGlobDist)+','	+
		'"'+piste.couleurId+'",'				+
		'"'+piste.refStation+'",'				+
		'"'+img+'")';

		//alert("insert  " + insert);
		tx.executeSql(insert);
	});
}

//Query the database
// recuperation de toutes les pistes stockees sur le telephone
// si select OK callback vers la fonction affichage dans la page 
function queryPisteAll(tx) {
	
	  tx.executeSql('SELECT '  +
			'PisteId  , ' +
			'Oid  , ' +
			'Nom , ' +
			'Descr, ' +
			'latitude , ' +
			'longitude , ' +
			'NotGlob , ' +
			'Couleur, ' +
			'Photo FROM PISTE' , [], AfficherListePiste, queryError);
 }

function queryError(tx, err) {

	alert("Erreur de traitement SQL : "+err.code);
}


//this is called when an error happens in a transaction
function errorHandler(transaction, error) {
	alert('Error: erreur sql' + ' code: ' );

}

//this is called when a successful transaction happens
function successCallBack() {
	alert("DEBUGGING: success");

}

function nullHandler(){

}
