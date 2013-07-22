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
	
}
