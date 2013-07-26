
//Cette fonction permet de remplacer le code courant du contenu de la page par ce code
function insererCodeNouvellePiste(){
	
	$('.bouton_retour').remove();
	$('#monHeader').append('<a class="bouton_retour" data-icon="arrow-l" data-rel="back"'+
			'data-direction="reverse" href="#" data-theme="a">Retour</a>');
	
	// Dans le cas où on clique sur un lien d'une piste, cela appelle la fonction 
	// "DetailPisteControleur()" pour avoir tous les details d'une piste
	$(".bouton_retour").bind ("click", function (event)
	{
		afficherCodeListePistes(); 
	});
	
	$('#contenuPage').html(

			'<form action="#" method="post">'+
			 
				'<fieldset data-role="fieldcontain">'+
					'<label for="username">Nom de la piste</label>'+
					'<input type="text" name="nom_nouvelle_piste" id="nom_nouvelle_piste">'+
				'</fieldset>'+
				 
				'<fieldset data-role="fieldcontain">'+
					'<label for="favcolor">Favorite Color:</label>'+
					'<select id="favcolor" name="favcolor">'+
						'<option>Select One</option>'+
						'<option>Green</option>'+
						'<option>Red</option>'+
						'<option>Blue</option>'+
						'<option>Yellow</option>'+
					'</select>'+
				'</fieldset>'+
				 
				'<fieldset data-role="fieldcontain">'+
					'<label for="hometown">Home Town:</label>'+
					'<input type="text" name="hometown" id="hometown">'+
				'</fieldset>'+
				 
				'<input type="submit" value="Register">'+
				 
			'</form>');
	
}
