// Ce footer sera ajouté à la fin de toutes les pages

// On teste si l'utilisateur est est déjà  authentifié
if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
	$('.page').append(
			'<div data-role="footer" data-tap-toggle="false">'+
				'<div data-role="navbar">'+
					'<ul class="menuFooter">'+
						'<li><a href = "#" class="lienListePiste ui-btn-active" data-role="button" data-transition="slidefade">Les pistes</a></li>'+
						'<li><a href = "#" class="lienMBP" data-role="button" data-transition="slidefade">MyBestPiste</a></li>'+
						'<li><a href = "#" class="lienNouvellepiste" data-role="button" data-transition="slidefade">Nouvelle piste</a></li>'+
						'<li><a href = "#" class="lienMesPistes" data-role="button" data-transition="slidefade">Mes Pistes</a></li>'+
					'</ul>'+
				'</div>'+
			'</div>');
	afficherMesPistes();
}
else
{
	$('.page').append(
			'<div data-role="footer" data-tap-toggle="false">'+
				'<div data-role="navbar">'+
					'<ul class="menuFooter">'+
						'<li><a href = "#" class="lienListePiste ui-btn-active" data-role="button" data-transition="slidefade">Les pistes</a></li>'+
						'<li><a href = "#" class="lienMBP" data-role="button" data-transition="slidefade">MyBestPiste</a></li>'+
						'<li><a href = "#" class="lienNouvellepiste" data-role="button" data-transition="slidefade">Nouvelle piste</a></li>'+
						'<li><a href = "#" class="lienAuthentification" data-role="button" data-transition="slidefade">S\'Authentifier</a></li>'+
					'</ul>'+
				'</div>'+
			'</div>');
}
