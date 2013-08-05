
// Ce footer sera ajouté à la fin de toutes les pages
$('.page').append(
		'<div class ="monfooter ui-bar" data-role="footer"  data-tap-toggle="false">'+
			'<div data-role="navbar">'+
				'<ul>'+
					'<li><a class="lienListePiste ui-btn-active" data-role="button">Les pistes</a></li>'+
					'<li><a class="lienNouvellepiste" data-role="button">Nouvelle piste</a></li>'+
					'<li><a class="lienMBP" href="#" data-role="button">MyBestPiste</a></li>'+
				'</ul>'+
			'</div>'+
		'</div>');