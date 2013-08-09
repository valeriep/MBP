
// Ce footer sera ajouté à la fin de toutes les pages
$('.page').append(
		'<div data-role="footer" data-tap-toggle="false">'+
			'<div data-role="navbar">'+
				'<ul>'+
					'<li><a href = "#" class="lienListePiste ui-btn-active" data-role="button" data-transition="slidefade">Les pistes</a></li>'+
					'<li><a href = "#" class="lienNouvellepiste" data-role="button" data-transition="slidefade">Nouvelle piste</a></li>'+
					'<li><a href = "#" class="lienMBP" data-role="button" data-transition="slidefade">MyBestPiste</a></li>'+
				'</ul>'+
			'</div>'+
		'</div>');