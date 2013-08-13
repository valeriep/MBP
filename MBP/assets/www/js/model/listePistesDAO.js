
//	select de toutes les pistes présentes en bdd 
function listPistAll(){
	db.transaction(queryPisteAll,errorHandler );
}

//Query the database
//recuperation de toutes les pistes stockees sur le telephone
//si select OK callback vers la fonction affichage dans la page 
function queryPisteAll(tx) {
	tx.executeSql('SELECT * from Piste p left join Couleur c on p.CouleurId = c.oid ' , [], traiterLesPiste, errorHandler);
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
		afficherContenuListePiste(lesPistes);
	}
}