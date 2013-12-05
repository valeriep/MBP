"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.UserPistesWorkflow = function(app) {
    var instance = this;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.activate();
        } else {
            app.services.resortRepo.getPistesByCreator(app.user.id, function(pistes) {
                pistesBriefWidget.display(pistes, app.user);
            });
        }
    };
};