// Ce footer sera ajouté avant les balises où on a mis class="content"
$('.content').before(
		'<div data-role="header">'+
			'<div class="connexionDeconnexion" style="display:none">'+
				'<a href = "#" class="lienAuthentification" data-role="button" data-transition="slidefade">S\'Authentifier</a>'+
				'<a href = "#" class="lienDeconnexion" data-role="button" data-transition="slidefade">Se deconnecter</a>'+
			'</div>'+
			'<h1>MY BEST PISTE</h1>'+
		'</div>');