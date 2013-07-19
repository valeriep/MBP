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

function listPistAll(){
	
	
	var pistAafficher = function(){db.transaction(queryPisteAll, errorHandler,successCallBack );}
	
	alert("listPistall" + pistAafficher.length);

}
function dropPiste(tx) {
	tx.executeSql( 'DROP TABLE IF EXISTS PISTE'); 

}

function createPiste(tx) {

	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Piste( ' +
			' PisteId INTEGER NOT	NULL PRIMARY KEY, ' +
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
		/*var insert = 'INSERT INTO Piste (Oid, Cread, Nom) VALUES ("'+piste.oid+'",'+
		'"'+piste.CREAD+'",'+
		'"'+piste.nom+'"		);';*/
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
			'Photo FROM PISTE' , [], function (tx, results) {

		var len = results.rows.length;
		lesPistes = new Array(len);

		alert ("boucle for" + len);
		for (i = 0; i < len; i++) {
			lesPistes[i] = (results.rows.item(i).PisteId, 
					results.rows.item(i).Oid, 
					results.rows.item(i).Nom,
					results.rows.item(i).nom,
					results.rows.item(i).Descr, 
					results.rows.item(i).latitude , 
					results.rows.item(i).longitude , 
					results.rows.item(i).NotGlob , 
					results.rows.item(i).Couleur, 
					results.rows.item(i).Photo )
		}
		alert("tableau de piste : " + lesPistes.length);
		return  lesPistes;
		
	});
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
