"use strict";

/**
 * Drives piste retrieving workflow
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWorkflow = function() {
    var instance = this;
    
    //widgets
    var searchPistesWidget = null;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        app.resortsSyncService.run();
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(instance.criteriaSet);
        }
        searchPistesWidget.show();
    };
    
    /**
     * @param {mbp.SearchPistesCriteria} criteria
     */
    this.criteriaSet = function(criteria) {
        app.localResortRepo.getPistesByCriteria(criteria, function(pistes) {
            pistesBriefWidget.show(pistes);
        });
    };
};