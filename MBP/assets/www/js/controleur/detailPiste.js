
//affichage des details d'une piste suite à la selection d'une piste
function AfficherDetailPiste(piste) {
	//alert(piste.couleur+"couleuuuuuur");
	
	/*
	// On vide tous les contenus de tous les balises qui vont être modifier (si jamais ils contiennent quelques choses)
	$('#detailNom').empty();
	$('#detailCouleur').empty();
	$('#detailNoteGlob').empty();
	$('#detailNoteSnow').empty();
	$('#detailNoteSun').empty();
	$('#detailNoteDifficulty').empty();
	$('#detailNotePanorama').empty();
	$('#detailNoteDescente').empty();
	$('#detailNoteDistance').empty();
	$('#detailDesc').empty();
	*/
	
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
	note("detailNoteDifficulty", piste.notGlobDiff); 
	note("detailNotePanorama", piste.notGlobPan); 
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

	
	//$('#detailPistPage').listview('refresh');
	
	$('#detailPistPage').bind('pageinit', function() {
		  $('#detailPistPage').listview('refresh');
		});
	
}