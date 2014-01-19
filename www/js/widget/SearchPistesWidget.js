"use strict";

/**
 * Drives piste retrieving workflow
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-search-pistes', hookSelector);
    var instance = this, parentShow = this.show;

    var searchCriteriaWidget = null;
    var pistesBriefWidget = null;
    var pisteDetailWidget = new mbp.PisteDetailWidget(instance.getJQuerySelector() + ' .search-result');

    this.show = function() {
        parentShow(this);

        if (!pistesBriefWidget) {
            pistesBriefWidget = new mbp.PistesBriefWidget(instance.getJQuerySelector() + ' .search-result', instance.pisteSelected);
        }
        pistesBriefWidget.show([]);

        if (!searchCriteriaWidget) {
            searchCriteriaWidget = new mbp.SearchPisteCriteriaWidget('#left-panel', instance.criteriaSet);
        }
        searchCriteriaWidget.show();
        jQuery('#content .search-result').on('remove', function() {
            jQuery('#left-panel').panel('close');
            jQuery('#left-panel-button').hide();
        });
        app.syncService.run(function() {
            searchCriteriaWidget.show();
        });
        jQuery(document).ready(function() {
            jQuery('#left-panel').panel('open');
            jQuery('#left-panel-button').show();
        });
    };

    /**
     * @param {mbp.PisteCriteria}
     *            criteria
     */
    this.criteriaSet = function(criteria) {
        jQuery('#left-panel').panel('close');
        if(criteria.isEmpty()) {
            app.localPisteRepo.getPistesByLastUpdate (20, function(pistes) {
                pistesBriefWidget.show(pistes);
            });
        } else {
            app.localPisteRepo.getPistesByCriteria(criteria, function(pistes) {
                pistesBriefWidget.show(pistes);
            });
        }
    };

    this.pisteSelected = function(piste) {
        pisteDetailWidget.show(piste);
        jQuery('#left-panel').panel('close');
    };
};