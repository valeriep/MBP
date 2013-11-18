"use strict";

/**
 * 
 * @constructor
 * @param {mbp.MyBestPistes} app
 * 
 */
mbp.SettingsWorkflow = function(app) {
    var instance = this;
    var settingsWidget = new mbp.SettingsWidget(app.logout);
    
    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.activate();
        } else {
            settingsWidget.display(app);
        }
    };
};