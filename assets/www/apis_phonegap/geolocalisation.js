//Attendre que PhoneGap soit prêt
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap est prêt
//
function onDeviceReady() {
    
	alert("dans la geolocalisation");
	var map = document.getElementById('map');
	map.style.display ='none';
	document.getElementById('cur_position').innerHTML = "Getting geolocation . . .";
	console.log("Getting geolocation . . .");
    navigator.geolocation.getCurrentPosition(onSuccess, onError,maximumAge: 3000, timeout: 5000, enableHighAccuracy: true);
}

//Fonction de callback onSuccess, reçoit un objet Position
//
function onSuccess(position) {

	var map = document.getElementById('map');
	var text = "<div>Latitude: " + pos.coords.latitude +
			"<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" +
			"Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
	document.getElementById('cur_position').innerHTML = text;
	console.log(text);
	map.style.display ='block';
	alert('Latitude : '                + position.coords.latitude          + '\n' +
	          'Longitude : '               + position.coords.longitude         + '\n' +
	          'Altitude : '                + position.coords.altitude          + '\n' +
	          'Précision : '               + position.coords.accuracy          + '\n' );

	var mapwidth = 270; // a mungy compromise between the 2 sizes
	var mapheight = 210; // since we can't get w / h dynamically
	map.src =
		"http://maps.googleapis.com/maps/api/staticmap?center=" +
		pos.coords.latitude +"," + pos.coords.longitude +"&zoom=14&size=" + mapwidth + "x" + mapheight
		+ "&maptype=roadmap&markers=color:green%7C" +pos.coords.latitude +"," + pos.coords.longitude + "&sensor=false";
	};

	// Fonction de callback onError, reçoit un objet PositionError
    //
    function onError(error) {
	document.getElementById('cur_position').innerHTML = "Error getting geolocation: " + error.code;
	console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
	};
	
	
};

