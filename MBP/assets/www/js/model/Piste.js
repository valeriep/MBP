function Piste(id, oid, cread, nom, descr, deniv, altDep, altArriv, lattitude,
			  longitude, motCle, statut, noteGlob,
			  NotGlobDiff, NotGlobPan, NotGlobQual, NotGlobPent, NotGlobDist, Couleur, RefStation, Photo)
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
  var NotGlobDiff ;
  var NotGlobPan ;
  var NotGlobQual ;
  var NotGlobPent ;
  var NotGlobDist ;
  var Couleur ;
  var RefStation ;
  var Photo ;
  
 
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
 this.NotGlobDiff = NotGlobDiff;
 this.NotGlobPan = NotGlobPan;
 this.NotGlobQual = NotGlobQual;
 this.NotGlobPent = NotGlobPent;
 this.NotGlobDist = NotGlobDist;
 this.Couleur = Couleur;
 this.RefStation = RefStation;
 this.Photo = Photo;
 
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
