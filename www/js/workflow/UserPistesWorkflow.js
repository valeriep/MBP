"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.UserPistesWorkflow = function() {
    var instance = this;
    var pistesBriefWidget = new mbp.PistesBriefWidget('#content', pisteSelected);
    var pisteDetailWidget = new mbp.PisteDetailWidget();
    
    this.activate = function() {
        app.syncService.run();
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(instance.activate);
            authWorkflow.activate();
        } else {
            app.localResortRepo.getPistesByCreator(app.user.id, function(pistes) {
                pistesBriefWidget.show({
                    resorts : {},
                    pistes : pistes
                });
            });
        }
        jQuery(document).ready(function() {
            jQuery('#left-panel').panel('close');
            jQuery('#left-panel-button').hide();
        });
    };
    
    function pisteSelected(piste) {
        pisteDetailWidget.show(piste);
    };
};