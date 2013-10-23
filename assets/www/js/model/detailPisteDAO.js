var pisteSelectionne;

function recupererDetailPiste(idPiste) {
	db.transaction(
			function (tx) { 
				tx.executeSql('SELECT p.*, c.*, s.nom as "nom_station", m.nom as "nom_massif", '+
							'pa.nom as "nom_pays" '+
							'FROM Piste p '+
							'left join Couleur c on p.CouleurId = c.Oid '+
							'inner join Pays pa on p.PaysId = pa.Oid '+
							'inner join Station s on p.StationId = s.Oid '+
							'inner join Massif m on s.MassifId = m.Oid '+
							'WHERE PisteId = "'+idPiste+'";', [], detailPisteSuccess, errorHandler);
			}, errorHandler);
}

function detailPisteSuccess(tx, result) {
	if (result != null && result.rows != null) {
			pisteSelectionne = new Piste(result.rows.item(0).PisteId, result.rows.item(0).Oid, result.rows.item(0).Cread,
				result.rows.item(0).Nom, result.rows.item(0).Descr, result.rows.item(0).Deniv, result.rows.item(0).AltDep,
				result.rows.item(0).AltArriv, result.rows.item(0).Lattitude, result.rows.item(0).Longitude, result.rows.item(0).Statut,
				result.rows.item(0).NotGlob, result.rows.item(0).NotGlobDiff, result.rows.item(0).NotGlobPan, result.rows.item(0).NotGlobEnsol,
				result.rows.item(0).NotGlobQual, result.rows.item(0).NotGlobPent, result.rows.item(0).NotGlobDist,
				result.rows.item(0).Couleur, result.rows.item(0).nom_station, result.rows.item(0).nom_massif, result.rows.item(0).nom_pays, result.rows.item(0).Photo);

			afficherContenueDetailPiste();
	}
}

function getPisteSelectionnee(){
	return pisteSelectionne;
}