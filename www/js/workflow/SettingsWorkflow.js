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
            settingsWidget.show();

            var positionRefreshed = function(position) {
                var positionWidget = new mbp.PositionWidget(app.device);
                positionWidget.show(position);
            };
            var positionRefreshFailed = function(positionError) {
                var positionWidget = new mbp.PositionWidget(app.device);
                positionWidget.show(positionError);
            };
            app.device.refreshPosition(positionRefreshed, positionRefreshFailed);
        }
        jQuery(document).ready(function() {
            jQuery('#left-panel').panel('close');
            jQuery('#left-panel-button').hide();
        });
    };
};