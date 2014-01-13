"use strict";

/**
 * Drives piste retrieving workflow
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-search-pistes', hookSelector);
    var instance = this, parentShow = this.show;
    
    var searchCriteriaWidget = null;
    var pistesBriefWidget = null;
    var pisteDetailWidget = new mbp.PisteDetailWidget('#content .search-result');
    
    this.show = function() {
        parentShow(this);

        if(!pistesBriefWidget) {
            pistesBriefWidget = new mbp.PistesBriefWidget('#content .search-result', instance.pisteSelected);
        }
        pistesBriefWidget.show({
            resorts : {},
            pistes : []
        });
        
        if(!searchCriteriaWidget) {
            searchCriteriaWidget = new mbp.SearchPisteCriteriaWidget('#left-panel', instance.criteriaSet);
        }
        searchCriteriaWidget.show();
        jQuery(document).ready(function() {
            jQuery('#left-panel').panel('open');
            jQuery('#left-panel-button').show();
        });
        jQuery('#content .search-result').on('remove', function() {
            jQuery('#left-panel').panel('close');
            jQuery('#left-panel-button').hide();
        });
    };
    
    /**
     * @param {mbp.PisteCriteria} criteria
     */
    this.criteriaSet = function(criteria) {
        jQuery('#left-panel').panel('close');
        app.localPisteRepo.getPistesByCriteria(criteria, function(pistes) {
            var resorts = {}, i = null;
            //FIXME truncate array to 20 elements
            for(i in pistes) {
                if(!resorts.hasOwnProperty(pistes[i].resortId)) {
                    app.localResortRepo.getResortById(pistes[i].resortId, function(resort) {
                        resorts[pistes[i].resortId] = resort;
                    });
                }
            }
            pistesBriefWidget.show({
                resorts : resorts,
                pistes : pistes
            });
        });
    };
    
    this.pisteSelected = function(piste) {
        pisteDetailWidget.show(piste);
        jQuery('#left-panel').panel('close');
    };
};