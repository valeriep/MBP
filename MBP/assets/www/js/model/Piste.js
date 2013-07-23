function Piste(id, oid, cread, nom, descr, deniv, altDep, altArriv, lattitude,
			  longitude, motCle, statut, noteGlob,
			  notGlobDiff, notGlobPan, notGlobQual, notGlobPent, notGlobDist, couleur, refStation, photo)
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
	  var motCle ;
	  var statut ;
	  var noteGlob ;
	  var notGlobDiff ;
	  var notGlobPan ;
	  var notGlobQual ;
	  var notGlobPent ;
	  var notGlobDist ;
	  var couleur ;
	  var refStation ;
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
	 this.longitude = longitude
	 this.motCle = motCle;
	 this.statut = statut;
	 this.noteGlob = noteGlob;
	 this.notGlobDiff = notGlobDiff;
	 this.notGlobPan = notGlobPan;
	 this.notGlobQual = notGlobQual;
	 this.notGlobPent = notGlobPent;
	 this.notGlobDist = notGlobDist;
	 this.couleur = couleur;
	 this.refStation = refStation;
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
}
