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
    var repo = null;
    
    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.activate();
        } else {
            if(app.device.isOnline()) {
                repo = new mbp.StubSeolanResortRepository();
            } else {
                repo = mbp.LocalResortRepository.getInstance();
            }
            app.device.refreshPosition(onPositionSucess, onPositinError);
        }
    };
    
    function onPositionSucess(position) {
        repo.getPistesCloseTo(position.coords.latitude, position.coords.longitude, onPistesRetrieved);
    };
    
    function onPositinError(msg) {
        pistesBriefWidget.display(new Array(), app.user);
        alert(msg);
    };
    
    function onPistesRetrieved(pistes){
        pistesBriefWidget.display(pistes, app.user);
    };
};