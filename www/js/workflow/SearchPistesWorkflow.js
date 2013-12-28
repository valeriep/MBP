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
    var pistesBriefWidget = new mbp.PistesBriefWidget('#content', pisteSelected);
    var pisteDetailWidget = new mbp.PisteDetailWidget();
    
    this.activate = function() {
        app.resortsSyncService.run();
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget('#left-panel', instance.criteriaSet);
        }
        searchPistesWidget.show();
        jQuery(document).ready(function() {
            jQuery('#left-panel').panel('open');
            jQuery('#left-panel-button').show();
        });
    };
    
    /**
     * @param {mbp.SearchPistesCriteria} criteria
     */
    this.criteriaSet = function(criteria) {
        jQuery('#left-panel').panel('close');
        app.localResortRepo.getPistesByCriteria(criteria, function(pistes) {
            pistesBriefWidget.show(pistes);
        });
    };
    
    function pisteSelected(piste) {
        pisteDetailWidget.show(piste);
        jQuery('#left-panel').panel('close');
    };
};