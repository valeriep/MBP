"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.ClosestPistesWorkflow = function() {
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        app.device.refreshPosition(onPositionSucess, onPositinError);
    };
    
    function onPositionSucess(position) {
        app.localResortRepo.getPistesCloseTo(position.coords.latitude, position.coords.longitude, onPistesRetrieved);
    };
    
    function onPositinError(msg) {
        pistesBriefWidget.display(new Array());
        alert(msg);
    };
    
    function onPistesRetrieved(pistes){
        pistesBriefWidget.display(pistes);
    };
};