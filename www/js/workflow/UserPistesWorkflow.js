"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.UserPistesWorkflow = function() {
    var instance = this;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        app.resortsSyncService.run();
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(instance.activate);
            authWorkflow.activate();
        } else {
            app.localResortRepo.getPistesByCreator(app.user.id, function(pistes) {
                pistesBriefWidget.display(pistes);
            });
        }
    };
};