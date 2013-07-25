var domaine = 'http://dynastar-chrome.xsalto.com';
var servicePiste = domaine+"/tzr/scripts/admin.php?moid=40&function=browseJSON";
var serviceCouleur = domaine+"/tzr/scripts/admin.php?moid=44&function=browseJSON";
var serviceStation = domaine+"/tzr/scripts/admin.php?moid=47&function=browseJSON";
var serviceMassif = domaine+"/tzr/scripts/admin.php?moid=46&function=browseJSON";


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

//Service de recupération de la table Station séolan
function getListeStations() {
	var couleursSeolan;

 $.ajax({async: false,type: "POST",url: serviceStation,dataType: "json",
     success: function(data){ stationsSeolan = data; }
 });
 return stationsSeolan;
}

//Service de recupération de la table Massif séolan
function getListeMassifs() {
	var massifsSeolan;

 $.ajax({async: false,type: "POST",url: serviceMassif,dataType: "json",
     success: function(data){ massifsSeolan = data; }
 });
 return massifsSeolan;
}
