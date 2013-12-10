"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SettingsWorkflow = function() {
    var instance = this;
    var settingsWidget = new mbp.SettingsWidget(app.logout);
    
    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(instance.activate);
            authWorkflow.activate();
        } else {
            settingsWidget.display();

            var positionRefreshed = function(position) {
                var positionWidget = new mbp.PositionWidget(app.device);
                positionWidget.display(position);
            };
            var positionRefreshFailed = function(positionError) {
                var positionWidget = new mbp.PositionWidget(app.device);
                positionWidget.display(positionError);
            };
            app.device.refreshPosition(positionRefreshed, positionRefreshFailed);
        }
    };
};