//Fonction de callback onError, reçoit un objet PositionError
function onError(error) {
	alert('code erreur geolocalisation : '    + error.code    + '\n' +
			'message : ' + error.message + '\n');
}

function queryError(tx, err) {
	alert("Erreur de traitement SQL : "+ err.code);
}

//this is called when an error happens in a transaction
function errorHandler(transaction, error) {
	alert('Error: erreur sql' +  error );
}

//this is called when a successful transaction happens
function successCallBack() {
	//alert("DEBUGGING: success");

}

function nullHandler(){

}

function errCreationSupp(){
	localStorage.removeItem("runnded");
}

function successCreationSupp(){
	premiereCreationBDD();
}