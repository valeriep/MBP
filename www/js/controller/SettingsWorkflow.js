"use strict";

/**
 * 
 * @constructor
 * @param {mbp.MyBestPistes} app
 * 
 */
app.SettingsWorkflow = function(app) {
    var instance = this;
    var settingsWidget = new mbp.SettingsWidget(onLogout);
    
    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.enter();
        } else {
            settingsWidget.display(app);
        }
    };
};