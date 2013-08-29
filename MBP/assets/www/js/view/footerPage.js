// Ce footer sera ajouté à la fin de toutes les pages

$('.page').append(
		'<div data-role="footer" data-tap-toggle="false">'+
			'<div data-role="navbar">'+
				'<ul class="menuFooter" style="display:none">'+
					'<li><a href = "#" class="lienListePiste" data-role="button" data-transition="slidefade">Les pistes</a></li>'+
					'<li><a href = "#" class="lienMBP" data-role="button" data-transition="slidefade">MyBestPiste</a></li>'+
					'<li><a href = "#" class="lienNouvellepiste" data-role="button" data-transition="slidefade">Nouvelle piste</a></li>'+
					'<li><a href = "#" class="lienMesPistes" data-role="button" data-transition="slidefade">Mes Pistes</a></li>'+
				'</ul>'+
			'</div>'+
		'</div>');
initilisationDesLiensDesPages();