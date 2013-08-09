function Piste(id, oid, cread, nom, descr, deniv, altDep, altArriv, lattitude,
			  longitude, statut, noteGlob,
			  notGlobDiff, notGlobPan, notGlobEnsol, notGlobQual, notGlobPent, notGlobDist,
			  couleur, station, massif, pays, photo)
 {
	  var id ;
	  var oid ;
	  var cread ;
	  var nom ;
	  var descr ;
	  var deniv ;
	  var altDep ;
	  var altArriv ;
	  var lattitude ;
	  var longitude ;
	  var statut ;
	  var noteGlob ;
	  var notGlobDiff ;
	  var notGlobPan ;
	  var notGlobEnsol ;
	  var notGlobQual ;
	  var notGlobPent ;
	  var notGlobDist ;
	  var couleur ;
	  var station ;
	  var massif ;
	  var pays;
	  var photo ;
	  
 
	 // Constructeur
	 this.id = id;
	 this.oid = oid;
	 this.cread = cread;
	 this.nom = nom;
	 this.descr = descr;
	 this.deniv = deniv;
	 this.altDep = altDep;
	 this.altArriv = altArriv;
	 this.lattitude = lattitude;
	 this.longitude = longitude;
	 this.statut = statut;
	 this.noteGlob = noteGlob;
	 this.notGlobDiff = notGlobDiff;
	 this.notGlobPan = notGlobPan;
	 this.notGlobEnsol = notGlobEnsol;
	 this.notGlobQual = notGlobQual;
	 this.notGlobPent = notGlobPent;
	 this.notGlobDist = notGlobDist;
	 this.couleur = couleur;
	 this.station = station;
	 this.massif = massif;
	 this.pays = pays;
	 this.photo = photo;
 }

function PisteList(pisteId ,
		nom, notGlob,couleurId,photo){
	var id ;
	var nom ;
	var noteGlob ;
	var couleur ;
	var photo ;
	
	//Constructeur
	this.id = pisteId;
	this.nom = nom;
	this.noteGlob = notGlob;
	this.couleur = couleurId;
	this.photo = photo;
}

function NouvellePiste(nom, idPays, idMassif, idStation, idCouleur,descr, motsCles, photo){
	var nom;
	var idPays;
	var idMassif;
	var idStation;
	var idCouleur;
	var descr;
	var motsCles;
	var photo;
	
	//Constructeur
	this.nom = nom;
	this.idPays = idPays;
	this.idMassif = idMassif;
	this.idStation = idStation;
	this.idCouleur = idCouleur;
	this.descr = descr;
	this.motsCles = motsCles;
	this.photo = photo;
}