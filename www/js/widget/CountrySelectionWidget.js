"use strict";

/**
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @param {String} jQuerySelector where to insert widget content
 * @param {mbp.AreaSelectWidget} areaSelectWidget
 * @param {Boolean} isMandatory
 * @param {Function} onValueChanged
 * @author ch4mp@c4-soft.com
 */
mbp.CountrySelectionWidget = function(app, jQuerySelector, areaSelectWidget, isMandatory, onValueChanged) {
    mbp.SelectionWidget.call(this, '#dot-value-select', jQuerySelector, 'country', 'Country', isMandatory, valueChanged);// parent constructor
    var parentDisplay = this.display;

    this.display = function(countries) {
        parentDisplay.call(this, countries);
        valueChanged(this.getSelected());
    };
    
    function valueChanged(selectedCountry) {
        if(areaSelectWidget) {
            areaSelectWidget.setSelectedCountry(selectedCountry);
            app.services.localResortRepo.getAreasByCountry(selectedCountry, function(areas){
                areaSelectWidget.display(areas);
            });
        }
        if(onValueChanged) {
            onValueChanged(selectedCountry);
        }
    };

    Object.preventExtensions(this);
};