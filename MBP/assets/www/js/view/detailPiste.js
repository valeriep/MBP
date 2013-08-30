
//Cette fonction permet de remplacer le code courant du contenu de la page par ce code
function insererCodeDetailPiste(){
	$('#contenuPageDetail').html(
			'<div class="container-fluid">'+
				'<div class="tzr-page-content">'+
					'<div class="row-fluid">'+
						'<div class="utilisateur">'+
							'<h2>Alex Dumont</h2>'+
						'</div>'+
					'</div>'+
					'<div class="row-fluid">'+
						'<div class="liste_pistes">'+
							'<div class="piste">'+
								'<div class="texte">'+
									'<div id="detailNom"></div>'+
									'<div id="detailCouleur"></div>'+

									'<div class="situation">'+
										'<div class="span4">'+
											'<div class="icon_ville" id="detailStation"></div>'+
										'</div>'+
										'<div class="span4">'+
											'<div class="icon_massif" id="detailMassif"></div>'+
										'</div>'+
										'<div class="span4">'+
											'<div class="icon_pays" id="detailPays"></div>'+
										'</div>'+
									'</div>'+

									'<div class="note_globale">'+
										'<span>Note</span>'+
										'<div id="detailNoteGlob"></div>'+
									'</div>'+

									'<div class="lesnotes">'+
										'<div class="row-fluid">'+
											'<div class="span4">'+
												'<div class="icon_neige"></div>'+
												'<p>Snow</p>'+
												'<div id="detailNoteSnow"></div>'+
											'</div>'+
											'<div class="span4">'+
												'<div class="icon_soleil"></div>'+
												'<p>Sun</p>'+
												'<div id="detailNoteSun"></div>'+
											'</div>'+
											'<div class="span4">'+
												'<div class="icon_difficulte"></div>'+
												'<p>Difficulty</p>'+
												'<div id="detailNoteDifficulty"></div>'+
											'</div>'+
										'</div>'+
										'<div class="row-fluid">'+
											'<div class="span4">'+
												'<div class="icon_panorama"></div>'+
												'<p>Panorama</p>'+
												'<div id="detailNotePanorama"></div>'+
											'</div>'+
												
											'<div class="span4">'+
												'<div class="icon_descente"></div>'+
												'<p>Descent</p>'+
												'<div id="detailNoteDescente"></div>'+
											'</div>'+
			
											'<div class="span4">'+
												'<div class="icon_distance"></div>'+
												'<p>Distance</p>'+
												'<div id="detailNoteDistance"></div>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="btn-toolbar">'+
										'<div class="btn-group" id="boutonNoterLaPiste">'+
											'<button class="btn-small btn-warning dropdown-toggle"'+
											'data-toggle="dropdown">Noter la piste</button>'+
										'</div>'+
									'</div>'+
								'</div>'+

								'<div class="cv3-grdimage">'+
									'<div id="detailPhoto"></div>'+
								'</div>'+

								'<div class="cv3-txtseul">'+
									'<p id="detailDescr"></p>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
		);
}