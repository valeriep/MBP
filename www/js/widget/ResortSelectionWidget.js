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

    Object.preventExtensions(this);
};