"use strict";

/**
 * 
 * @constructor
 * @param {mbp.myBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.ClosestPistesWorkflow = function(app) {
    var instance = this;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.activate();
        } else {
            app.device.refreshPosition(onPositionSucess, onPositinError);
        }
    };
    
    function onPositionSucess(position) {
        app.services.resortRepo.getPistesCloseTo(position.coords.latitude, position.coords.longitude, onPistesRetrieved);
    };
    
    function onPositinError(msg) {
        pistesBriefWidget.display(new Array(), app.user);
        alert(msg);
    };
    
    function onPistesRetrieved(pistes){
        pistesBriefWidget.display(pistes, app.user);
    };
};