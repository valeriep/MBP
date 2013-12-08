"use strict";

/**
 * Drives piste creation workflow
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.NewPisteWorkflow = function(app) {
    var instance = this;
    
    //widgets
    var newPisteWidget = null;
    var pisteDetailWidget = new mbp.PisteDetailWidget(app);

    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.activate();
        } else {
            if(!newPisteWidget) {
                newPisteWidget = new mbp.NewPisteWidget(app, instance.pisteCreated);
            }
            newPisteWidget.display();
        }
    };
    
    this.pisteCreated = function(piste) {
        pisteDetailWidget.display(piste);
    };
    
    Object.preventExtensions(this);
};