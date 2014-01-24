"use strict";

/**
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @param {Boolean} isMandatory
 * @param {Function} onValueChanged
 * @author ch4mp@c4-soft.com
 */
mbp.ResortSelectionWidget = function(jQuerySelector, isMandatory, onValueChanged) {
    mbp.SelectionWidget.call(this, '#dot-key-value-select', jQuerySelector, 'resortId', gettext('resortSelection', 'resort'), isMandatory, onValueChanged);
    var parentShow = this.show;
    
    this.show = function(resorts) {
        var resortsById = {}, i = null;
        for(i in resorts) {
            resortsById[resorts[i].id] = resorts[i].name;
        }
        parentShow(resortsById);
    };

    Object.preventExtensions(this);
};