"use strict";

/**
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @param {mbp.ResortSelectWidget} resortSelectWidget
 * @param {Boolean} isMandatory
 * @param {Function} onValueChanged
 * @author ch4mp@c4-soft.com
 */
mbp.AreaSelectionWidget = function(jQuerySelector, resortSelectWidget, isMandatory, onValueChanged) {
    mbp.SelectionWidget.call(this, '#dot-value-select', jQuerySelector, 'area', gettext('areaSelection', 'area'), isMandatory, valueChanged);
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
            app.localResortRepo.getResortsNameByCountryAndArea(selectedCountry, selectedArea, function(resorts){
                resortSelectWidget.display(resorts);
            });
        }
        if(onValueChanged) {
            onValueChanged(selectedArea);
        }
    };

    Object.preventExtensions(this);
};