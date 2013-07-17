function visibilite(thingId)
			{
			//	alert(thingId);
				var targetElement;
				targetElement = document.getElementById(thingId) ;
				if (targetElement.style.display == "none")
				{
				targetElement.style.display = "" ;
				} else {
				targetElement.style.display = "none" ;
				}
				if(thingId =="geo") document.addEventListener("deviceready", onDeviceReady, false);
				
			}
			
function init(){
    document.addEventListener("deviceready", deviceOnReady, false);
    getEntries();
	insertPiste();
	renderEntries();
    //handle form submission of a new/old note
    $("#editNoteForm").live("submit",function(e) {
        var data = {title:$("#noteTitle").val(), 
                    body:$("#noteBody").val(),
                    id:$("#noteId").val()
        };
        saveNote(data,function() {
            $.mobile.changePage("index.html",{reverse:true});
        });
        e.preventDefault();
    });

    //will run after initial show - handles regetting the list
    $("#homePage").live("pageshow", function() {
        getEntries(); 
    });

    //edit page logic needs to know to get old record (possible)
    $("#editPage").live("pageshow", function() {
        //get the location - it is a hash - got to be a better way
        var loc = window.location.hash;
        if(loc.indexOf("?") >= 0) {
            var qs = loc.substr(loc.indexOf("?")+1,loc.length);
            var noteId = qs.split("=")[1];
            //load the values
            $("#editFormSubmitButton").attr("disabled","disabled"); 
            dbShell.transaction(
                function(tx) {
                    tx.executeSql("select id,title,body from notes where id=?",[noteId],function(tx,results) {
                        $("#noteId").val(results.rows.item(0).id);
                        $("#noteTitle").val(results.rows.item(0).title);
                        $("#noteBody").val(results.rows.item(0).body);
                        $("#editFormSubmitButton").removeAttr("disabled");   
                    });
                }, dbErrorHandler);
            
        } else {
         $("#editFormSubmitButton").removeAttr("disabled");   
        }
    });			
function onDeviceReady() {
			openDatabase();
			
			
			//	alert('on device ready');
				if(navigator.geolocation){
			//	 alert('navigator');
					navigator.geolocation.getCurrentPosition(onSuccess, onError);}
					
					else{
						alert('no geolocation support');
					}
				}

				// Fonction de callback onSuccess, reçoit un objet Position
				//
			function onSuccess(position) {
			//	alert('cest ok'+position.coords.latitude);
					var element = document.getElementById('geo');
					element.innerHTML = 'Latitude : '                + position.coords.latitude          + '<br/>' +
										'Longitude : '               + position.coords.longitude         + '<br/>' +
										'Altitude : '                + position.coords.altitude          + '<br/>' +
										'Précision : '               + position.coords.accuracy          + '<br/>' +
										'Direction : '               + position.coords.heading           + '<br/>' +
										'Vitesse : '                 + position.coords.speed             + '<br/>';
				}

				// Fonction de callback onError, reçoit un objet PositionError
				//
				function onError(error) {
				//alert('cest une erreur');
					alert('code : '    + error.code    + '\n' +
						  'message : ' + error.message + '\n');
				}
		</script>