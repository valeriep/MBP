var domaine = 'http://dynastar-chrome.xsalto.com';
var servicePiste = domaine+"/tzr/scripts/admin.php?moid=40&function=browseJSON";
var serviceCouleur = domaine+"/tzr/scripts/admin.php?moid=44&function=browseJSON";
var imagePiste ;
var valeurNote;

//Service de recupération de la table piste séolan
function getPisteList(latitude, longitude) {
	var pistesSeolan;
 	// TODO
	// il faudra par la suite envoyer la longitude et latitude à SEOLAN
	// pour recuperer les pistes les plus proches du point geographique
	
    $.ajax({async: false,type: "POST",url: servicePiste,dataType: "json",
        success: function(data){ pistesSeolan = data; }
    });
    return pistesSeolan;
}


// Service de recupération de la table couleur séolan
function getListeCouleurs() {
	var couleursSeolan;

    $.ajax({async: false,type: "POST",url: serviceCouleur,dataType: "json",
        success: function(data){ couleursSeolan = data; }
    });
    return couleursSeolan;
}
