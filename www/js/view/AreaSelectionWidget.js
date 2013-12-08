"use strict";

/**
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @param {String} jQuerySelector where to insert widget content
 * @param {mbp.ResortSelectWidget} resortSelectWidget
 * @param {Boolean} isMandatory
 * @param {Function} onValueChanged
 * @author ch4mp@c4-soft.com
 */
mbp.AreaSelectionWidget = function(app, jQuerySelector, resortSelectWidget, isMandatory, onValueChanged) {
    mbp.SelectionWidget.call(this, '#dot-value-select', jQuerySelector, 'area', 'Area', isMandatory, valueChanged);
    var selectedCountry = '';
    var parentDisplay = this.display;

    this.display = function(areas) {
        parentDisplay.call(this, areas);
        valueChanged(this.getSelected());
    };
    
    /**
     * 
     * @param {String} country
     */
    this.setSelectedCountry = function(country) {
        selectedCountry = country;
    };
    
    function valueChanged(selectedArea) {
        if(resortSelectWidget) {
            app.services.localResortRepo.getResortsNameByCountryAndArea(selectedCountry, selectedArea, function(resorts){
                resortSelectWidget.display(resorts);
            });
        }
        if(onValueChanged) {
            onValueChanged(selectedArea);
        }
    };

    Object.preventExtensions(this);
};