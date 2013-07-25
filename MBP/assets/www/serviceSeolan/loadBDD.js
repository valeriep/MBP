var domaine = 'http://dynastar-chrome.xsalto.com';
var servicePiste = domaine+"/tzr/scripts/admin.php?moid=40&function=browseJSON";
var serviceCouleur = domaine+"/tzr/scripts/admin.php?moid=44&function=browseJSON";
var serviceStation = domaine+"/tzr/scripts/admin.php?moid=47&function=browseJSON";


//Service de recup�ration de la table piste s�olan
function getPisteList(latitude, longitude) {
	var pistesSeolan;
 	// TODO
	// il faudra par la suite envoyer la longitude et latitude � SEOLAN
	// pour recuperer les pistes les plus proches du point geographique
	
    $.ajax({async: false,type: "POST",url: servicePiste,dataType: "json",
        success: function(data){ pistesSeolan = data; }
    });
    return pistesSeolan;
}


// Service de recup�ration de la table couleur s�olan
function getListeCouleurs() {
	var couleursSeolan;

    $.ajax({async: false,type: "POST",url: serviceCouleur,dataType: "json",
        success: function(data){ couleursSeolan = data; }
    });
    return couleursSeolan;
}


//Service de recup�ration de la table station s�olan
function getListeCouleurs() {
	var couleursSeolan;

 $.ajax({async: false,type: "POST",url: serviceStation,dataType: "json",
     success: function(data){ stationsSeolan = data; }
 });
 return stationsSeolan;
}
