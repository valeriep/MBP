//global variables
var db;
var shortName = 'MyBestPisteDB';
var version = '1.0';
var displayName = 'MyBestPisteDB';
var maxSize = 200000;
var listPist;
var listCouleurs;
var lesPistes;
var pisteSelectionne;
var idPiste;
var nomPiste;
var pathImage;
var nombre_de_piste_total;
var nombre_de_piste;

//this line tries to open the database base locally on the device
// if it does not exist, it will create it and return a database
db = openDatabase(shortName, version, displayName,maxSize);

function initbdd(listPistSeolan, listCouleursSeolan){
	if (!window.openDatabase) {
		// not all mobile devices support databases  if it does not, the
		// indicating the device will not be albe to run this application
		alert('Databases are not supported in this browser.');
		return;
	}

	// supprimer les tables s'ils existent
	db.transaction(dropCouleur ,nullHandler,nullHandler);
	db.transaction(dropPiste ,nullHandler,nullHandler);
	
	// créer les tables s'ils n'existent pas
	db.transaction(createCouleur,errorHandler,successCallBack);
	db.transaction(createPiste,errorHandler,successCallBack);
	
	// chargement des tables à partir du resultat du fichier json
	listCouleurs = listCouleursSeolan;
	listPist = listPistSeolan;
	stockageCouleur();
	stockagePiste();
}

function recupererDetailPiste(id) {
	idPiste = id;
	db.transaction(detailPiste, errorHandler);
}

function detailPiste(tx) {
    tx.executeSql('SELECT * FROM Piste p, Couleur c WHERE p.CouleurId = c.oid and PisteId = "'+idPiste+'";', [], detailPisteSuccess, errorHandler);
}

function detailPisteSuccess(tx, result) {
    // resultats contient les reponses a la requete
    var len = result.rows.length;
    
    if (result != null && result.rows != null) {
		//alert("nombre des lignes selectionnées : " + result.rows.length);
		
    	alert(result.rows.item(0).Couleur+"hhhhhhhh");
		pisteSelectionne = new Piste(result.rows.item(0).PisteId, result.rows.item(0).Oid, result.rows.item(0).Cread,
			result.rows.item(0).Nom, result.rows.item(0).Descr, result.rows.item(0).Deniv, result.rows.item(0).AltDep,
			result.rows.item(0).AltArriv,	result.rows.item(0).Lattitude, result.rows.item(0).Longitude, result.rows.item(0).MotCle, result.rows.item(0).Statut,
			result.rows.item(0).NotGlob, result.rows.item(0).NotGlobDiff, result.rows.item(0).NotGlobPan, result.rows.item(0).NotGlobEnsol,
			result.rows.item(0).NotGlobQual, result.rows.item(0).NotGlobPent, result.rows.item(0).NotGlobDist,
			result.rows.item(0).Couleur, result.rows.item(0).Station, result.rows.item(0).Massif, result.rows.item(0).Photo);
	
		//alert("pisteSelectionne.nom"+pisteSelectionne.nom);
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

//Creation de la table Couleur
function createCouleur(tx) {
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Couleur( ' +
			'couleurId INTEGER NOT	NULL PRIMARY KEY, ' +
			'Oid TEXT , ' +
			'Libelle TEXT, ' +
			'Couleur TEXT)');
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
			'Station TEXT, ' +
			'Massif TEXT, ' +
	'Photo TEXT)');
}

//Insertion des couleurs recuperées de SEOLAN listPist est la liste des pistes
function stockageCouleur() {	
	
	$.each(listCouleurs, function(i, couleur){
		insert(couleur);
	})
	
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
	'Station , ' +
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
//alert(insert);	 	
}

//	Query the database
//	recuperation de toutes les pistes stockees sur le telephone
//	si select OK callback vers la fonction affichage dans la page 
	function queryPisteAll(tx) {
		//alert("recup les pistes");
		tx.executeSql('SELECT * from Piste p, Couleur c WHERE p.CouleurId = c.oid' , [], traiterLesPiste, errorHandler);

	}

	function traiterLesPiste(tx,result){

		var lesPistes = new Array(result.rows.length);

		if (result != null ) {
			for (i = 0; i < result.rows.length; i++) {
				
				alert(result.rows.item(i).Couleur);
				//alert("llll" + result.rows.item(i).Photo);
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


//	this is called when an error happens in a transaction
	function errorHandler(transaction, error) {
		alert('Error: erreur sql' +  error );

	}

//	this is called when a successful transaction happens
	function successCallBack() {
		//alert("DEBUGGING: success");

	}

	function nullHandler(){

	}
