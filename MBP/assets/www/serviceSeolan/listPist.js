var domaine = 'http://dynastar-chrome.xsalto.com';
var serviceURL = domaine+"/tzr/scripts/admin.php?moid=40&function=browseJSON";
var imagePiste ;
var valeurNote;


function getPisteList(latitude, longitude) {
	var pistesSeolan;
 	// TODO
	// il faudra par la suite envoyer la longitude et latitude à SEOLAN
	// pour recuperer les pistes les plus proches du point geographique
	
	    $.ajax({async: false,type: "POST",url: serviceURL,dataType: "json",
	        success: function(data){ pistesSeolan = data; }
	    });
	   
	    return pistesSeolan;
	
  

	
//	$.getJSON(serviceURL,  { latitude: latitude, longitude: longitude })
	   
//	.done(function(data) {
//		$('#liste_pistes li').remove();
//		//valeurNote = '3.5';
//		$.each(data, function(index, piste) {
//			// Dans le cas ou pas image de piste sur le serveur
//			if (!piste.F0001){
//				imagePiste = "./images/pisteDefault.png";
//			}
//			else {
//				imagePiste = domaine+ piste.F0001+ '&geometry=50x50%3E'; 
//			}
//		var divStar = "star" + index;
//		
//		$('#liste_pistes').append('<li><div class="piste"><div class="photo"><img src="' + imagePiste +'" alt="Piste" width="50px" height="50px"></div>' +
//					'<div class="texte"><h2><a href="detailPiste.html?piste.idPiste=' + piste.oid + '">' + piste.nom + 
//					'<div style="background-color:'+piste.couleurId+'" class="couleur img-circle"></div></h2></div>' +
//					'<div class="note_globale">' + 
//					'<span>Note </span> <strong>' + piste.notGlob + '</strong></div>' + 
//					'<div id="' + divStar  + '" data-score="' + piste.notGlob + '" disabled="disabled">' +
//					'</div></div>');
//			$("#" + divStar ).raty({
//				readOnly  : true,
//				width: false,
//				path : "./images/",
//				score: function() {
//				return $(this).attr('data-score');
//				}
//				});
//			});
//		$('#liste_pistes').listview('refresh');
//	})
//	.fail(function( jqxhr, textStatus, error ) {
//var err = textStatus + ', ' + error;
//
//});

}
