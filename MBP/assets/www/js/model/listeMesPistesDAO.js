
//	select de toutes les pistes présentes en bdd 
function listMesPistAll(){
	db.transaction(queryMesPisteAll,errorHandler );
}

//Query the database
//recuperation de toutes les pistes stockees sur le telephone
//si select OK callback vers la fonction affichage dans la page 
function queryMesPisteAll(tx) {
	tx.executeSql('SELECT * from Piste p left join Couleur c on p.CouleurId = c.oid WHERE p.ProprietairePiste = 1' , [], traiterMesPistes, errorHandler);
}

function traiterMesPistes(tx,result){
	var mesPistes = new Array(result.rows.length);
	
	if (result != null ) {
		for (i = 0; i < result.rows.length; i++) {
			mesPistes[i] = new PisteList(result.rows.item(i).PisteId ,
					result.rows.item(i).Nom, 
					result.rows.item(i).NotGlob,
					result.rows.item(i).Couleur,
					result.rows.item(i).Photo);
		}
		afficherContenuListeMesPistes(mesPistes);
	}
}