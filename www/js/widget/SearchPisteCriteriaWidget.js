"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector
 * @param {Function} onCriteriaSet
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPisteCriteriaWidget = function(hookSelector, onCriteriaSet) {
    mbp.Widget.call(this, '#dot-search-pistes-criteria', hookSelector);
    var instance = this, parentShow = this.show;
    
    var resortSelectWidget = new mbp.ResortSelectionWidget(instance.getJQuerySelector() + ' .search-pistes-form .resort-select', false);
    var areaSelectWidget = new mbp.AreaSelectionWidget(instance.getJQuerySelector() + ' .search-pistes-form .area-select', resortSelectWidget, false, true);
    var countrySelectWidget = new mbp.CountrySelectionWidget(instance.getJQuerySelector() + ' .search-pistes-form .country-select', areaSelectWidget, false, true);
    var colorSelectWidget = new mbp.ColorSelectionWidget(instance.getJQuerySelector() + ' .search-pistes-form .color-select', false);
    var sunRangeWidget = new mbp.MarkRangeWidget(instance.getJQuerySelector() + ' .search-pistes-form .sun-range', 'sun-mark', 'sun');
    var snowRangeWidget = new mbp.MarkRangeWidget(instance.getJQuerySelector() + ' .search-pistes-form .snow-range', 'snow-mark', 'snow');
    var accessRangeWidget = new mbp.MarkRangeWidget(instance.getJQuerySelector() + ' .search-pistes-form .access-range', 'access-mark', 'access');
    var verticalDropRangeWidget = new mbp.MarkRangeWidget(instance.getJQuerySelector() + ' .search-pistes-form .vertical-drop-range', 'vertical-drop-mark', 'verticalDrop');
    var lengthRangeWidget = new mbp.MarkRangeWidget(instance.getJQuerySelector() + ' .search-pistes-form .length-range', 'length-mark', 'length');
    var viewRangeWidget = new mbp.MarkRangeWidget(instance.getJQuerySelector() + ' .search-pistes-form .view-range', 'view-mark', 'view');

    /**
     * 
     */
    this.show = function() {
        parentShow.call();
        app.localResortRepo.getCountriesHavingPistes(function(countriesWithPistes) {
            countrySelectWidget.show(countriesWithPistes);
        });
        colorSelectWidget.show(mbp.Piste.COLORS);

        jQuery(instance.getJQuerySelector() + ' .search-pistes-form').unbind('submit').submit(onSubmit);

        sunRangeWidget.show();
        snowRangeWidget.show();
        accessRangeWidget.show();
        verticalDropRangeWidget.show();
        lengthRangeWidget.show();
        viewRangeWidget.show();

        jQuery(document).ready(function() {
            jQuery(instance.getJQuerySelector() + ' .search-pistes-form').submit();
        });
    };

    function onSubmit(event) {
        var resortIds = [];
        
        if(resortSelectWidget.getSelected()) {
            resortIds.push(resortSelectWidget.getSelected());
        } else if(areaSelectWidget.getSelected()) {
            app.localResortRepo.getResortNamesByArea(areaSelectWidget.getSelected(), function(resortNamesById) {
                var resortId = null;
                for(resortId in resortNamesById) {
                    resortIds.push(resortId);
                }
            });
        } else if(countrySelectWidget.getSelected()) {
            var country = countrySelectWidget.getSelected();
            app.localResortRepo.getAllResorts(function(resorts) {
                var i = null;
                for(i in resorts) {
                    if(!country || country == resorts[i].country) {
                        resortIds.push(resorts[i].id);
                    }
                }
            });
        }
        
        onCriteriaSet(new mbp.PisteCriteria(
                resortIds,
                colorSelectWidget.getSelected(),
                sunRangeWidget.getMin(),
                sunRangeWidget.getMax(),
                snowRangeWidget.getMin(),
                snowRangeWidget.getMax(),
                accessRangeWidget.getMin(),
                accessRangeWidget.getMax(),
                verticalDropRangeWidget.getMin(),
                verticalDropRangeWidget.getMax(),
                lengthRangeWidget.getMin(),
                lengthRangeWidget.getMax(),
                viewRangeWidget.getMin(),
                viewRangeWidget.getMax()));
        event.preventDefault();
        return false;
    }

    Object.preventExtensions(this);
};