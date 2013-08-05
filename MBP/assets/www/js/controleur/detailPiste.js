//affichage des details d'une piste suite à la selection d'une piste
function afficherContenueDetailPiste(piste) {
	
//	$("#maPage").attr('data-add-back-btn','true');
	
	// TODO : Les valeur des tests ("null"..) sont à vérifier.. 	
	if(piste.nom != ""){
		$('#detailNom').html('<h2><a href="#">'+piste.nom+'</a></h2>');
	}
	else
		$('#detailNom').html('<h2><a href="#">Piste sans nom</a></h2>');
	
	if(piste.couleur != "null") {
		$('#detailCouleur').html('<div style="background-color:'+piste.couleur+'" class="couleur img-circle"></div>');
	}
	else
		$('#detailCouleur').remove();

	// Afficher les notes 
	note("detailNoteGlob", piste.noteGlob); // Par exemple ici on affiche la note globale dans la balise detailNoteGlob
	note("detailNoteSnow", piste.notGlobQual);
	note("detailNoteSun", piste.notGlobDiff);
	note("detailNoteDifficulty", piste.notGlobDiff); 
	note("detailNotePanorama", piste.notGlobPan);
	note("detailNoteEnsol", piste.notGlobEnsol); 
	note("detailNoteDescente", piste.notGlobPent); 
	note("detailNoteDistance", piste.notGlobDist);
	
	//TODO : dans la base de données on ne les a pas !!! on a noteGlobQual!! il manque des notes dans la console et dans la classe Piste.js
	/*
	note("detailNoteSnow", piste.noteGlob); 
	note("detailNoteSun", piste.notGlobQual); 
	*/
	
	
	if(piste.descr != "null") {
		$('#detailDescr').text(piste.descr);
	}
	else
		$('#detailDescr').remove();

	if(piste.photo != null)
		$('#detailPhoto').html('<img class="gdeimg" src="'+piste.photo+'" width="400" height="230" alt="Photo">');
	else
		$('#detailPhoto').remove();
	
	if(piste.station != null) 
		$('#detailStation').html('<p>'+piste.station+'</p>');
	else
		$('#detailStation').remove();
		
	if(piste.massif != null) 
		$('#detailMassif').html('<p>'+piste.massif+'</p>');
	else
		$('#detailMassif').remove();

	if(piste.pays != null) 
		$('#detailPays').html('<p>'+piste.pays+'</p>');
	else
		$('#detailPays').remove();
	
	$('#contenuPageChargementDetailPiste').hide();
}
