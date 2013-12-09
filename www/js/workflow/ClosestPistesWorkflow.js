"use strict";

/**
 * 
 * @constructor
 * @param {mbp.myBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.ClosestPistesWorkflow = function(app) {
    var pistesBriefWidget = new mbp.PistesBriefWidget(app);
    
    this.activate = function() {
        app.device.refreshPosition(onPositionSucess, onPositinError);
    };
    
    function onPositionSucess(position) {
        app.services.resortRepo.getPistesCloseTo(position.coords.latitude, position.coords.longitude, onPistesRetrieved);
    };
    
    function onPositinError(msg) {
        pistesBriefWidget.display(new Array());
        alert(msg);
    };
    
    function onPistesRetrieved(pistes){
        pistesBriefWidget.display(pistes);
    };
};