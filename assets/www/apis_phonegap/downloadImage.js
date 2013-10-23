
function downloadFile(piste, proprietairePiste){
	var thefileUrl = "NOK";
	var imgPiste = domaine+ piste.F0001; //+ '&geometry=50x50%3E';
	
	//phonegap API function
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0,
			function onFileSystemSuccess(fileSystem) {
				fileSystem.root.getFile(
						"dummy.html", {create: true, exclusive: false},
						function gotFileEntry(fileEntry){
							var sPath = fileEntry.fullPath.replace("dummy.html","");
							var fileTransfer = new FileTransfer();
							fileEntry.remove();
							var pisteid = piste.oid.replace(':','');
							thefileUrl	= sPath + 'MyBESTPISTE/'+pisteid+ '.png';
							fileTransfer.download(imgPiste,sPath + 'MyBESTPISTE/'+ pisteid + '.png',
									function(theFile) {
										//alert("download complete: " + thefileUrl);
										insertPiste(piste, proprietairePiste, thefileUrl);
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
	return thefileUrl;
}

function fail(evt) {
	console.log(evt.target.error.code);
	alert("error failure stockage imagePiste " +evt.target.error.code )
	insertPiste(piste, "./images/pisteDefault.png");
}
