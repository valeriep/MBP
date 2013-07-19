function Piste(id, oid, cread, nom, descr, deniv, altDep, altArriv, lattitude,
			  motCle, statut, noteGlob,
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
  
  
  // Getteurs
  this.getId = function()
  {
   return this.id;
  }
  
  
  
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


/*
 *  this.DitBonjour = function()
  {
   document.write( "Bonjour "+ this.utilisateur);
  }
 */
*/