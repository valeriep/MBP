"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector
 * @param {Function} onCriteriaSet
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWidget = function(hookSelector, onCriteriaSet) {
    mbp.Widget.call(this, '#dot-search-pistes', hookSelector);// parent constructor

    var parentShow = this.show;// save reference to Widget display function to call it from overloading function
    var name = '';
    var resortSelectWidget = new mbp.ResortSelectionWidget('#search-pistes-form .resort-select', false);
    var areaSelectWidget = new mbp.AreaSelectionWidget('#search-pistes-form .area-select', resortSelectWidget, false);
    var countrySelectWidget = new mbp.CountrySelectionWidget('#search-pistes-form .country-select', areaSelectWidget, false);
    var colorSelectWidget = new mbp.ColorSelectionWidget('#search-pistes-form .color-select', false);

    /**
     * 
     */
    this.show = function() {
        parentShow.call(this, {
            name : name
        });
        app.localResortRepo.getAllCountries(function(countries) {
            countrySelectWidget.show(countries);
        });
        colorSelectWidget.show(mbp.Piste.COLORS);

        jQuery('#search-pistes-form').unbind('submit').submit(onSubmit);
        jQuery('#name').unbind('change').change(function() {
            name = mbp.sanitize(jQuery('#name').val().trim());
        });
        jQuery(document).ready(function() {
            jQuery('#search-pistes-form').submit();
        });
    };
    
    function onSubmit(event) {
        onCriteriaSet(new mbp.SearchPistesCriteria(countrySelectWidget.getSelected(), areaSelectWidget.getSelected(), resortSelectWidget
                .getSelected(), name, colorSelectWidget.getSelected()));
        event.preventDefault();
        return false;
    }

    Object.preventExtensions(this);
};