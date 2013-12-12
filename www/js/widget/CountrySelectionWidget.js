"use strict";

/**
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @param {mbp.AreaSelectWidget} areaSelectWidget
 * @param {Boolean} isMandatory
 * @param {Function} onValueChanged
 * @author ch4mp@c4-soft.com
 */
mbp.CountrySelectionWidget = function(jQuerySelector, areaSelectWidget, isMandatory, onValueChanged) {
    mbp.SelectionWidget.call(this, '#dot-value-select', jQuerySelector, 'country', gettext('countrySelection', 'country'), isMandatory, valueChanged);// parent constructor
    var parentDisplay = this.show;

    this.show = function(countries) {
        parentDisplay.call(this, countries);
        valueChanged(this.getSelected());
    };
    
    function valueChanged(selectedCountry) {
        if(areaSelectWidget) {
            areaSelectWidget.setSelectedCountry(selectedCountry);
            app.localResortRepo.getAreasByCountry(selectedCountry, function(areas){
                areaSelectWidget.show(areas);
            });
        }
        if(onValueChanged) {
            onValueChanged(selectedCountry);
        }
    };

    Object.preventExtensions(this);
};