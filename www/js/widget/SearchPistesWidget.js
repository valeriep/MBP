"use strict";

/**
 * 
 * @constructor
 * @param {Function} onCriteriaSet
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWidget = function(onCriteriaSet) {
    mbp.Widget.call(this, '#dot-search-pistes');// parent constructor

    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var name = '';
    var resortSelectWidget = new mbp.ResortSelectionWidget('#search-pistes-form .resort-select', false);
    var areaSelectWidget = new mbp.AreaSelectionWidget('#search-pistes-form .area-select', resortSelectWidget, false);
    var countrySelectWidget = new mbp.CountrySelectionWidget('#search-pistes-form .country-select', areaSelectWidget, false);
    var colorSelectWidget = new mbp.ColorSelectionWidget('#search-pistes-form .color-select', false);

    /**
     * 
     */
    this.display = function() {
        parentDisplay.call(this, {
            name : name
        });
        app.localResortRepo.getAllCountries(function(countries) {
            countrySelectWidget.display(countries);
        });
        colorSelectWidget.display(mbp.Piste.COLORS);

        jQuery('#search-pistes-form').unbind('submit').submit(
                function(event) {
                    onCriteriaSet(new mbp.SearchPistesCriteria(countrySelectWidget.getSelected(), areaSelectWidget.getSelected(), resortSelectWidget
                            .getSelected(), name, colorSelectWidget.getSelected()));
                    event.preventDefault();
                    return false;
                });
        jQuery('#name').unbind('change').change(function() {
            name = mbp.sanitize(jQuery('#name').val().trim());
        });
    };

    Object.preventExtensions(this);
};