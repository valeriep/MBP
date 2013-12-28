"use strict";

/**
 * Drives piste creation workflow
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.NewPisteWorkflow = function() {
    var instance = this;
    
    //widgets
    var newPisteWidget = null;
    var pisteDetailWidget = new mbp.PisteDetailWidget();

    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(instance.activate);
            authWorkflow.activate();
        } else {
            if(!newPisteWidget) {
                newPisteWidget = new mbp.NewPisteWidget(instance.pisteCreated);
            }
            newPisteWidget.show();
        }
        jQuery(document).ready(function() {
            jQuery('#left-panel').panel('close');
            jQuery('#left-panel-button').hide();
        });
    };
    
    this.pisteCreated = function(piste) {
        pisteDetailWidget.show(piste);
    };
    
    Object.preventExtensions(this);
};