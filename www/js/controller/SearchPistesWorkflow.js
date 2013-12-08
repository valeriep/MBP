"use strict";

/**
 * Drives piste retrieving workflow
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWorkflow = function(app) {
    var instance = this;
    
    //widgets
    var searchPistesWidget = null;
    var pistesBriefWidget = new mbp.PistesBriefWidget(app);
    
    this.activate = function() {
        app.services.resortsSyncService.run();
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(app, instance.criteriaSet);
        }
        searchPistesWidget.display();
    };
    
    /**
     * @param {mbp.SearchPistesCriteria} criteria
     */
    this.criteriaSet = function(criteria) {
        app.services.resortsSyncService.getPistesByCriteria(criteria, function(pistes) {
            pistesBriefWidget.display(pistes);
        });
    };
};