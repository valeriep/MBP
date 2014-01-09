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
    var parentShow = this.show;

    this.show = function(areas) {
        parentShow.call(this, areas);
    };
    
    function valueChanged(selectedArea) {
        if(resortSelectWidget) {
            app.localResortRepo.getResortsByArea(selectedArea, function(resorts) {
                resortSelectWidget.show(resorts);
            });
        }
        if(onValueChanged) {
            onValueChanged(selectedArea);
        }
    };

    Object.preventExtensions(this);
};