"use strict";

/**
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @param {mbp.AreaSelectWidget} areaSelectWidget
 * @param {Boolean} isMandatory
 * @param {Boolean} displayHavingPistesOnly
 * @param {Function} onValueChanged
 * @author ch4mp@c4-soft.com
 */
mbp.CountrySelectionWidget = function(jQuerySelector, areaSelectWidget, isMandatory, displayHavingPistesOnly, onValueChanged) {
    mbp.SelectionWidget.call(this, '#dot-value-select', jQuerySelector, 'country', gettext('countrySelection', 'country'), isMandatory, valueChanged);// parent constructor
    var parentShow = this.show;

    this.show = function(countries) {
        parentShow.call(this, countries);
    };
    
    function valueChanged(selectedCountry) {
        if(areaSelectWidget) {
            if(displayHavingPistesOnly) {
                app.localResortRepo.getAreasHavingPistes(selectedCountry, function(areas) {
                    areaSelectWidget.show(areas);
                });
            } else {
                app.localResortRepo.getAreasByCountry(selectedCountry, function(areas){
                    areaSelectWidget.show(areas);
                });
            }
        }
        if(onValueChanged) {
            onValueChanged(selectedCountry);
        }
    };

    Object.preventExtensions(this);
};