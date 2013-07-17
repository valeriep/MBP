
function initbdd(){
	// Base de données
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);

	db.transaction(populateDB, errorCB, successCB);		
}

function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS PISTE');
	tx.executeSql('CREATE TABLE IF NOT EXISTS PISTE (id unique, nom, note)');
	tx.executeSql('INSERT INTO PISTE (id, nom, note) VALUES (1, "First pist", 0)');
	tx.executeSql('INSERT INTO PISTE (id, nom, note) VALUES (2, "Second pist", 0)');
}

// Query the database
//
function queryDB(tx) {
	var s="";
	tx.executeSql('SELECT * FROM PISTE', [], function (tx, results) {
	var len = results.rows.length;
	//alert(len);
	for (i = 0; i < len; i++) {
		// s += "Piste n° = " + i + " ID = " + results.rows.item(i).id + " Nom =  " + results.rows.item(i).nom + " Note =  " + results.rows.item(i).note + "<br />";
		s+= "<ul id=\"liste_pistes\" data-role=\"listview\" > Piste n° = " + i + " ID = " + results.rows.item(i).id + " Nom =  " + results.rows.item(i).nom + " Note =  " + results.rows.item(i).note + "</ul>";

	}

	$("#listePistes").html(s);

	// Afficher la liste des piste
	//document.write(s);
	//alert(s);
	});
}

// Query the success callback
//
function querySuccess(tx, results) {				
	// this will be empty since no rows were inserted.
	console.log("Insert ID = " + results.insertId);
	// this will be 0 since it is a select statement
	console.log("Rows Affected = " + results.rowAffected);
	// the number of rows returned by the select statement
	console.log("Insert ID = " + results.rows.length);
}

// Transaction error callback
//
function errorCB(err) {
	alert("errorCB");
	//console.log("Error processing SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	//db.transaction(queryDB, errorCB);
}
