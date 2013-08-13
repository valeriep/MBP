
function downloadFile(piste){
	var thefileUrl = "NOK";
	var imgPiste = domaine+ piste.F0001; //+ '&geometry=50x50%3E';
	
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0,
			function onFileSystemSuccess(fileSystem) {
				fileSystem.root.getFile(
						"dummy.html", {create: true, exclusive: false},
						function gotFileEntry(fileEntry){
						//	alert(" dans recupfile : " + imgPiste + "--- " + piste.nom);
							var sPath = fileEntry.fullPath.replace("dummy.html","");
							var fileTransfer = new FileTransfer();
							fileEntry.remove();
							var pisteid = piste.oid.replace(':','');
							thefileUrl	= sPath + 'MyBESTPISTE/'+pisteid+ '.png';
									fileTransfer.download(imgPiste,sPath + 'MyBESTPISTE/'+ pisteid + '.png',
									function(theFile) {
										//alert("download complete: " + thefileUrl);
									},
									function(error) {
										alert("error stockage imagePiste");
										console.log("download error source " + error.source); 
										console.log("download error target " + error.target);
										console.log("upload error code: " + error.code);
										insertPiste(piste, "./images/pisteDefault.png");
									});
						},
						fail);
			},fail);
	//alert("valeur de file uri" + thefileUri);
	return thefileUrl ;
}

function fail(evt) {
	console.log(evt.target.error.code);
	alert("error failure stockage imagePiste " +evt.target.error.code )
	insertPiste(piste, "./images/pisteDefault.png");
}
